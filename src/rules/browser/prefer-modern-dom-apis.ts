import type { CallExpression, MemberExpression, Node } from '@typescript-eslint/types/dist/ast-spec'
import type { ReportFixFunction, SourceCode } from '@typescript-eslint/utils/dist/ts-eslint'
import type ts from 'typescript'
import {
  closest,
  isAwait,
  isCallExpression,
  isChainExpression,
  isIdentifier,
  isLiteral,
  isLiteralValue,
  isMemberExpression,
} from '../../node'
import { createRule, getParserServices } from '../../rule'
import { property, quote, wrap } from '../../utils'

const METHOD_NAMES = <const>[
  'appendChild',
  'removeChild',
  'replaceChild',
  'insertBefore',
  'insertAdjacentText',
  'insertAdjacentElement',
  'getAttribute',
  'setAttribute',
  'hasAttribute',
  'removeAttribute',
]

type FixableMethodName = typeof METHOD_NAMES[number]

export default createRule({
  name: 'browser/prefer-modern-dom-apis',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Prefer Modern DOM APIs',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      appendChild: over('Element#append()', 'Element#appendChild()'),
      removeChild: over('childNode.remove()', 'parentNode.removeChild(childNode)'),
      replaceChild: over('childNode.replaceWith(newNode)', 'parentNode.replaceChild(newNode, oldNode)'),
      insertBefore: over('oldNode.before(newNode)', 'parentNode.insertBefore(newNode, oldNode)'),
      insertAdjacentText: over('node.before("text")', 'node.insertAdjacentText("beforebegin", "text")'),
      insertAdjacentElement: over('node.before(newNode)', 'node.insertAdjacentElement("beforebegin", newNode)'),
      getAttribute: over('.dataset', '.getAttribute("data-*")'),
      setAttribute: over('.dataset', '.setAttribute("data-*")'),
      hasAttribute: over('.dataset', '.hasAttribute("data-*")'),
      removeAttribute: over('.dataset', '.removeAttribute("data-*")'),
    },
    replacedBy: ['unicorn/prefer-dom-node-append', 'unicorn/prefer-dom-node-remove', 'unicorn/prefer-modern-dom-apis'],
  },
  create(context) {
    const source = context.getSourceCode()
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    return {
      CallExpression(node) {
        const [methodName, expression] = parse(node.callee)
        if (!methodName || !expression) return
        if (!isElement(typeChecker, esTreeNodeToTSNodeMap.get(expression.object))) return
        context.report({
          node,
          messageId: methodName,
          fix: getFixer(source, methodName, node),
        })
      },
    }
  },
})

function parse(node: Node): [FixableMethodName | undefined, MemberExpression | undefined] {
  if (isChainExpression(node)) {
    return parse(node.expression)
  } else if (isMemberExpression(node)) {
    const name = wrap(node.property, (node) => {
      if (isIdentifier(node)) return node.name
      if (isLiteral(node) && typeof node.value === 'string') return node.value
      return
    })
    if (!isFixableMetohdName(name)) return [undefined, undefined]
    if (name.endsWith('Attribute')) {
      const called = closest(node, isCallExpression)
      if (!isLiteralValue(called?.arguments[0], /^data-/)) return [undefined, undefined]
      return [name, node]
    }
    return [name, node]
  }
  return [undefined, undefined]
}

function isFixableMetohdName(name: string | undefined): name is FixableMethodName {
  if (!name) return false
  return (METHOD_NAMES as readonly string[]).includes(name)
}

function getFixer(
  source: Readonly<SourceCode>,
  methodName: FixableMethodName,
  node: CallExpression
): ReportFixFunction | undefined {
  const { callee } = node
  if (!isMemberExpression(callee)) return
  switch (methodName) {
    case 'appendChild':
      return (fixer) => fixer.replaceText(callee.property, 'append')
    case 'removeChild':
      return (fixer) => {
        const prefix = wrap(node.arguments[0], (node) => {
          const text = source.getText(node)
          return isAwait(node) ? '(' + text + ')' : text
        })
        return fixer.replaceText(node, prefix + '.remove()')
      }
    case 'replaceChild':
    case 'insertBefore':
      return (fixer) => {
        const newNode = source.getText(node.arguments[0])
        const oldNode = source.getText(node.arguments[1])
        const method = methodName === 'replaceChild' ? 'replaceWith' : 'before'
        return fixer.replaceText(node, `${oldNode}.${method}(${newNode})`)
      }
    case 'insertAdjacentText':
    case 'insertAdjacentElement':
      return (fixer) => {
        if (!isLiteral(node.arguments[0])) return null
        const position = wrap(node.arguments[0].value, (value) => {
          if (value === 'beforebegin') return 'before'
          if (value === 'afterbegin') return 'prepend'
          if (value === 'beforeend') return 'append'
          if (value === 'afterend') return 'after'
          return
        })
        if (!position) return null
        const baseNode = source.getText(callee.object)
        const insert = source.getText(node.arguments[1])
        return fixer.replaceText(node, `${baseNode}${callee.optional ? '?' : ''}.${position}(${insert})`)
      }
    case 'getAttribute':
      return getDataSetFixer(source, node, (prefix, name) => prefix + property(name))
    case 'setAttribute':
      return getDataSetFixer(
        source,
        node,
        (prefix, name) => `${prefix}${property(name)} = ${source.getText(node.arguments[1])}`
      )
    case 'hasAttribute':
      return getDataSetFixer(source, node, (prefix, name) => `Object.hasOwn(${prefix}, ${quote(name)})`)
    case 'removeAttribute':
      return getDataSetFixer(source, node, (prefix, name) => `delete ${prefix}${property(name)}`)
  }
}

function getDataSetFixer(
  source: Readonly<SourceCode>,
  node: CallExpression,
  replacer: (prefix: string, name: string) => string
): ReportFixFunction {
  return (fixer) => {
    const { callee } = node
    if (!isMemberExpression(callee)) return null
    const prefix = `${source.getText(callee.object)}${callee.optional ? '?' : ''}.dataset`
    const name = getDataSetName(node.arguments[0])
    if (!name) return null
    return fixer.replaceText(node, replacer(prefix, name))
  }
}

function getDataSetName(node: Node) {
  if (!isLiteral(node) || typeof node.value !== 'string') return
  if (!node.value.startsWith('data-')) return
  return node.value
    .replace(/^data-/, '')
    .split(/-/g)
    .map((element, index) => (index === 0 ? element : element[0].toUpperCase() + element.slice(1)))
    .join('')
}

function over(oldPattern: string, newPattern: string) {
  return `Prefer \`${oldPattern}\` over \`${newPattern}\`.`
}

function isElement(checker: ts.TypeChecker, node: ts.Node) {
  const type = checker.getTypeAtLocation(node)
  if (type.isUnionOrIntersection()) {
    return type.types.some(isElementBaseType)
  }
  return isElementBaseType(type)
  function isElementBaseType(type: ts.Type) {
    return type.getBaseTypes()?.some((baseType) => {
      const symbol = baseType.getSymbol()
      return symbol && checker.symbolToString(symbol) === 'Element'
    })
  }
}

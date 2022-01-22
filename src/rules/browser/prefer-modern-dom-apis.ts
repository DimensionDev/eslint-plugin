import type { CallExpression, MemberExpression, Node } from '@typescript-eslint/types/dist/ast-spec'
import type { ReportFixFunction, SourceCode } from '@typescript-eslint/utils/dist/ts-eslint'
import type ts from 'typescript'
import {
  closest,
  isAwait,
  isCallExpression,
  isChainExpression,
  isIdentifier,
  isIdentifierName,
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
  'getElementById',
  'getElementsByClassName',
  'getElementsByTagName',
]

type FixableMethodName = typeof METHOD_NAMES[number]

export default createRule({
  name: 'browser/prefer-modern-dom-apis',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    hasSuggestions: true,
    docs: {
      description: 'Prefer Modern DOM APIs',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      appendChild: prefer('append', 'appendChild'),
      removeChild: prefer('remove', 'removeChild'),
      replaceChild: prefer('replaceWith', 'replaceChild'),
      insertBefore: prefer('before', 'insertBefore'),
      insertAdjacentText: prefer('{{method}}', 'insertAdjacentText({{action}}, *)'),
      insertAdjacentElement: prefer('{{method}}', 'insertAdjacentElement({{action}}, *)'),
      getAttribute: prefer('dataset{{path}}', 'getAttribute({{name}})'),
      setAttribute: prefer('dataset{{path}}', 'setAttribute({{name}}, *)'),
      hasAttribute: prefer('dataset{{path}}', 'hasAttribute({{name}})'),
      removeAttribute: prefer('dataset{{path}}', 'removeAttribute({{name}})'),
      getElementById: prefer('getElementById', 'querySelector'),
      getElementsByClassName: prefer('getElementsByClassName', 'querySelectorAll'),
      getElementsByTagName: prefer('getElementsByTagName', 'querySelectorAll'),
      innerText: prefer('textContent', 'innerText'),
      innerTextSuggest: 'Switch to `.textContent`',
    },
    replacedBy: [
      'unicorn/prefer-dom-node-append',
      'unicorn/prefer-dom-node-remove',
      'unicorn/prefer-dom-node-text-content',
      'unicorn/prefer-query-selector',
      'unicorn/prefer-modern-dom-apis',
    ],
  },
  create(context) {
    const source = context.getSourceCode()
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    return {
      MemberExpression(node) {
        if (!isIdentifierName(node.property, 'innerText')) return
        if (!isElement(typeChecker, esTreeNodeToTSNodeMap.get(node.object))) return
        const fix: ReportFixFunction = (fixer) => fixer.replaceText(node.property, 'textContent')
        context.report({
          node: node.property,
          messageId: 'innerText',
          suggest: [{ messageId: 'innerTextSuggest', fix }],
        })
      },
      Property(node) {
        if (node.parent?.type !== 'ObjectPattern') return
        if (!isElement(typeChecker, esTreeNodeToTSNodeMap.get(node.parent))) return
        if (!isIdentifierName(node.key, 'innerText')) return
        const fix: ReportFixFunction = (fixer) => {
          return fixer.replaceText(node.key, `textContent${node.shorthand ? ': innerText' : ''}`)
        }
        context.report({
          node,
          messageId: 'innerText',
          suggest: [{ messageId: 'innerTextSuggest', fix }],
        })
      },
      CallExpression(node) {
        const [methodName, expression] = parse(node.callee)
        if (!methodName || !expression) return
        if (!isElement(typeChecker, esTreeNodeToTSNodeMap.get(expression.object))) return
        context.report({
          node,
          messageId: methodName,
          data: getMessageData(source, methodName, node),
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
        const position = getMethodOfLocation(node.arguments[0].value)
        if (!position) return null
        const baseNode = source.getText(callee.object)
        const insert = source.getText(node.arguments[1])
        return fixer.replaceText(node, `${baseNode}${callee.optional ? '?' : ''}.${position}(${insert})`)
      }
    case 'getAttribute':
    case 'setAttribute':
    case 'hasAttribute':
    case 'removeAttribute':
      return getDataSetFixer(source, node, methodName)
  }
  return
}

function getDataSetFixer(
  source: Readonly<SourceCode>,
  node: CallExpression,
  methodName: FixableMethodName
): ReportFixFunction {
  return (fixer) => {
    const replacement = getReplacement()
    if (!replacement) return null
    return fixer.replaceText(node, replacement)
  }
  function getReplacement() {
    const { callee } = node
    if (!isMemberExpression(callee)) return
    const prefix = `${source.getText(callee.object)}${callee.optional ? '?' : ''}.dataset`
    const name = getDataSetName(node.arguments[0])
    if (!name) return
    switch (methodName) {
      case 'getAttribute':
        return prefix + property(name)
      case 'setAttribute':
        return `${prefix}${property(name)} = ${source.getText(node.arguments[1])}`
      case 'hasAttribute':
        return `Object.hasOwn(${prefix}, ${quote(name)})`
      case 'removeAttribute':
        return `delete ${prefix}${property(name)}`
    }
    return
  }
}

function getDataSetName(node: Node) {
  if (!isLiteral(node) || typeof node.value !== 'string') return
  if (!node.value.startsWith('data-')) return
  return node.value
    .replace(/^data-/, '')
    .toLowerCase()
    .split(/-/g)
    .map((element, index) => (index === 0 ? element : element[0].toUpperCase() + element.slice(1)))
    .join('')
}

function getMessageData(source: Readonly<SourceCode>, methodName: FixableMethodName, node: CallExpression) {
  switch (methodName) {
    case 'insertAdjacentText':
    case 'insertAdjacentElement':
      if (!isLiteral(node.arguments[0])) return
      return {
        method: getMethodOfLocation(node.arguments[0].value),
        action: source.getText(node.arguments[0]),
      }
    case 'getAttribute':
    case 'setAttribute':
    case 'hasAttribute':
    case 'removeAttribute': {
      const name = getDataSetName(node.arguments[0])
      if (!name) return
      return {
        path: property(name),
        name: source.getText(node.arguments[0]),
      }
    }
  }
  return
}

function getMethodOfLocation(value: unknown) {
  if (value === 'beforebegin') return 'before'
  if (value === 'afterbegin') return 'prepend'
  if (value === 'beforeend') return 'append'
  if (value === 'afterend') return 'after'
  return
}

function isElement(checker: ts.TypeChecker, node: ts.Node) {
  const type = checker.getTypeAtLocation(node)
  const types = type.isUnionOrIntersection() ? type.types : [type]
  return types
    .flatMap((t) => t.getBaseTypes() ?? [])
    ?.some((baseType) => {
      const symbol = baseType.getSymbol()
      return symbol && checker.symbolToString(symbol) === 'Element'
    })
}

function prefer(modern: string, legacy: string) {
  return `Prefer \`.${modern}\` over \`.${legacy}\``
}

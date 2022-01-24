import type { CallExpression, Node } from '@typescript-eslint/types/dist/ast-spec'
import type { ReportFixFunction, SourceCode } from '@typescript-eslint/utils/dist/ts-eslint'
import { isAwait, isLiteral, isMemberExpression } from '../../node'
import { createRule, getParserServices } from '../../rule'
import { isElement } from '../../type-checker'
import { wrap } from '../../utils'
import { parseCallee } from './prefer-query-selector'

const METHOD_NAMES = new Set([
  'appendChild',
  'removeChild',
  'replaceChild',
  'insertBefore',
  'insertAdjacentText',
  'insertAdjacentElement',
])

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
      instead: 'Use `Element#{{modern}}` instead of `Element#{{legacy}}`',
    },
    replacedBy: ['unicorn/prefer-dom-node-append', 'unicorn/prefer-dom-node-remove', 'unicorn/prefer-modern-dom-apis'],
  },
  create(context) {
    const source = context.getSourceCode()
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    return {
      CallExpression(node) {
        const [methodName, expression] = parseCallee(node.callee)
        if (!methodName || !expression) return
        if (!METHOD_NAMES.has(methodName)) return
        if (!isElement(typeChecker, esTreeNodeToTSNodeMap.get(expression.object))) return
        context.report({
          node,
          messageId: 'instead',
          data: {
            modern: getModernMethodName(node.arguments[0], methodName),
            legacy: methodName,
          },
          fix: getFixer(source, node, methodName),
        })
      },
    }
  },
})

function getFixer(
  source: Readonly<SourceCode>,
  node: CallExpression,
  methodName: string
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
  }
  return
}

function getModernMethodName(node: Node, methodName: string) {
  switch (methodName) {
    case 'appendChild':
      return 'append'
    case 'removeChild':
      return 'remove'
    case 'replaceChild':
      return 'replaceWith'
    case 'insertBefore':
      return 'before'
    case 'insertAdjacentText':
    case 'insertAdjacentElement':
      if (!isLiteral(node)) return
      return getMethodOfLocation(node.value)
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

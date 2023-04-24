import type { Node } from '@typescript-eslint/types/dist/generated/ast-spec.js'
import { isBindCall, isFunctionLike, isIdentifierName, isMemberExpression } from '../../node.js'
import { createRule, getParserServices } from '../../rule.js'
import { isEventTarget } from '../../type-checker.js'
import { quote } from '../../utils.js'
import { parseCallee } from './prefer-query-selector.js'

export default createRule({
  name: 'browser/prefer-event-target',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Prefer `EventTarget#{add,remove}EventListener()` over `on`-functions',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      'instead': 'Use `EventTarget#{{replacement}}EventListener` instead of `.{{methodName}}`',
      'invalid-bound': 'The listener argument should be a function reference',
    },
    replacedBy: ['unicorn/prefer-add-event-listener', 'unicorn/no-invalid-remove-event-listener'],
  },
  create(context) {
    const source = context.getSourceCode()
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    return {
      AssignmentExpression(node) {
        if (node.operator !== '=') return
        const { left, right } = node
        const [eventName, expression] = parseCallee(left)
        if (!eventName?.startsWith('on')) return
        if (!eventName || !expression?.object) return
        if (!isEventTarget(typeChecker, esTreeNodeToTSNodeMap.get(expression.object))) return
        context.report({
          node: left,
          messageId: 'instead',
          data: {
            replacement: isNil(right) ? 'remove' : 'add',
            methodName: eventName,
          },
          fix(fixer) {
            if (isNil(right)) return null
            const reference = source.getText(expression.object) + (expression.optional ? '?' : '')
            const method = quote(eventName.replace(/^on/, ''))
            const handle = source.getText(right)
            const modified = `${reference}.addEventListener(${method}, ${handle})`
            return fixer.replaceText(node, modified)
          },
        })
      },
      CallExpression(node) {
        if (!isMemberExpression(node.callee)) return
        if (!isIdentifierName(node.callee.property, 'removeEventListener')) return
        const callback = node.arguments[1]
        if (!(isBindCall(callback) || isFunctionLike(callback))) return
        context.report({ node, messageId: 'invalid-bound' })
      },
    }
  },
})

function isNil(node: Node) {
  if (node.type === 'Literal') return node.raw === 'null'
  if (node.type === 'Identifier') return node.name === 'undefined'
  return false
}

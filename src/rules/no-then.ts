import type { Node } from '@typescript-eslint/types/dist/generated/ast-spec.js'
import { isFunctionLike, isIdentifierName, isLiteralValue, isMemberExpression } from '../node.js'
import { createRule } from '../rule.js'

export default createRule({
  name: 'no-then',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow `Promise#then(...)`',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Found `then` usage. You should usually use async / await instead.',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const invalid =
          isMemberExpression(node.callee) && isThen(node.callee.property) && node.arguments.some(isFunctionLike)
        if (!invalid) return
        context.report({ node, messageId: 'invalid' })
      },
    }
  },
})

function isThen(node: Node) {
  return isIdentifierName(node, 'then') || isLiteralValue(node, 'then')
}

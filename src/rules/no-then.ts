import type { Node } from '@typescript-eslint/types/dist/ast-spec'
import { isFunctionLike, isIdentifierName, isLiteralValue, isMemberExpression } from '../node'
import { createRule } from '../rule'

export default createRule({
  name: 'no-then',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow `.then(...)`',
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

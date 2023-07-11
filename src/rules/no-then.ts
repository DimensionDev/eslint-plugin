import type { TSESTree } from '@typescript-eslint/types'
import { isFunctionLike, isIdentifierName, isLiteralValue, isMemberExpression } from '../node.js'
import { createRule } from '../rule.js'

export default createRule({
  name: 'no-then',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow `Promise#then(...)`',
      recommended: 'stylistic',
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

function isThen(node: TSESTree.Node) {
  return isIdentifierName(node, 'then') || isLiteralValue(node, 'then')
}

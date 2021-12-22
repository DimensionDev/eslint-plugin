import type { CallExpression, NewExpression } from '@typescript-eslint/types/dist/ast-spec'
import { isIdentifierName } from '../node'
import { createRule } from '../rule'

export default createRule({
  name: 'no-number-constructor',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow use `Number` constructor',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Disallow use `Number` constructor',
    },
  },
  create(context) {
    function handle(node: NewExpression | CallExpression) {
      if (!isIdentifierName(node.callee, 'Number')) return
      context.report({ node, messageId: 'invalid' })
    }
    return {
      NewExpression: handle,
      CallExpression: handle,
    }
  },
})

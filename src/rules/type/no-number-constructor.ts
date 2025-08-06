import type { TSESTree } from '@typescript-eslint/types'
import { isIdentifierName } from '../../node.ts'
import { createRule } from '../../rule.ts'

export default createRule({
  name: 'type/no-number-constructor',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow use `Number` constructor',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      invalid: 'Disallow use `Number` constructor',
    },
  },
  defaultOptions: [],
  create(context) {
    function handle(node: TSESTree.NewExpression | TSESTree.CallExpression) {
      if (!isIdentifierName(node.callee, 'Number')) return
      context.report({ node, messageId: 'invalid' })
    }
    return {
      NewExpression: handle,
      CallExpression: handle,
    }
  },
})

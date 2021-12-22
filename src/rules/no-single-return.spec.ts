import { AST_NODE_TYPES } from '@typescript-eslint/types'
import dedent from 'ts-dedent'
import { runTest } from '../spec'
import module from './no-single-return'

runTest({
  module,
  *valid() {
    yield dedent`
      function example() {
        if (1) return true
        if (2) return true
        return false;
      }
    `
  },
  *invalid() {
    yield {
      code: dedent`
        function example() {
          let out = false;
          if (1) out = true;
          if (2) out = true;
          return out;
        }
      `,
      errors: [
        { messageId: 'invalid', type: AST_NODE_TYPES.VariableDeclarator },
        { messageId: 'invalid', type: AST_NODE_TYPES.AssignmentExpression },
        { messageId: 'invalid', type: AST_NODE_TYPES.AssignmentExpression },
        { messageId: 'invalid', type: AST_NODE_TYPES.ReturnStatement },
      ],
    }
  },
})

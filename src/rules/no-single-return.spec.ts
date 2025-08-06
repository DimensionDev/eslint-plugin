import { AST_NODE_TYPES } from '@typescript-eslint/types'
import { dedent } from 'ts-dedent'
import { tester } from '../spec.ts'
import module from './no-single-return.ts'

tester.test(module, {
  valid: [
    dedent`
      function example() {
        if (1) return true
        if (2) return true
        return false;
      }
    `,
  ],
  invalid: [
    {
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
    },
  ],
})

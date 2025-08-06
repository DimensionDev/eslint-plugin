import { AST_NODE_TYPES } from '@typescript-eslint/types'
import { dedent } from 'ts-dedent'
import { tester } from '../spec.ts'
import module from './no-top-level.ts'

tester.test(module, {
  valid: [
    'const foo = "bar"',
    // { code: 'let foo = "bar"', options: [{ variable: false }] },
    // { code: '{ let foo = "bar" }', options: [{ variable: false }] },
    // { code: 'if (1) {}', options: [{ 'side-effect': false }] },
    // { code: '{ if (1) {} }', options: [{ 'side-effect': false }] },
  ],
  invalid: [
    {
      code: 'let foo = "bar"',
      errors: [{ messageId: 'variable', data: { kind: 'let' }, type: AST_NODE_TYPES.VariableDeclaration }],
    },
    {
      code: '{ let foo = "bar" }',
      errors: [{ messageId: 'variable', type: AST_NODE_TYPES.VariableDeclaration }],
    },
    {
      code: 'example()',
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.ExpressionStatement }],
    },
    {
      code: 'if (1) {}',
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.IfStatement }],
    },
    {
      code: dedent`
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
        }
      `,
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.ForStatement }],
    },
    {
      code: 'for (const element in []) {}',
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.ForInStatement }],
    },
    {
      code: 'for (const element of []) {}',
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.ForOfStatement }],
    },
    {
      code: 'while (true) {}',
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.WhileStatement }],
    },
    {
      code: 'do {} while (true)',
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.DoWhileStatement }],
    },
    {
      code: dedent`
        switch (example) {
          case 1:
            break
        }
      `,
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.SwitchStatement }],
    },
  ],
})

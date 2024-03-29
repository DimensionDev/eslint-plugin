import { AST_NODE_TYPES } from '@typescript-eslint/types'
import { dedent } from 'ts-dedent'
import { runTest } from '../spec.js'
import module from './no-top-level.js'

runTest({
  module,
  *valid(cast) {
    yield 'const foo = "bar"'
    yield cast({ code: 'let foo = "bar"', options: [{ variable: false }] })
    yield cast({ code: '{ let foo = "bar" }', options: [{ variable: false }] })
    yield cast({ code: 'if (1) {}', options: [{ 'side-effect': false }] })
    yield cast({ code: '{ if (1) {} }', options: [{ 'side-effect': false }] })
  },
  *invalid() {
    yield {
      code: 'let foo = "bar"',
      errors: [{ messageId: 'variable', data: { kind: 'let' }, type: AST_NODE_TYPES.VariableDeclaration }],
    }
    yield {
      code: '{ let foo = "bar" }',
      errors: [{ messageId: 'variable', type: AST_NODE_TYPES.VariableDeclaration }],
    }
    yield {
      code: 'example()',
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.ExpressionStatement }],
    }
    yield {
      code: 'if (1) {}',
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.IfStatement }],
    }
    yield {
      code: dedent`
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
        }
      `,
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.ForStatement }],
    }
    yield {
      code: 'for (const element in []) {}',
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.ForInStatement }],
    }
    yield {
      code: 'for (const element of []) {}',
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.ForOfStatement }],
    }
    yield {
      code: 'while (true) {}',
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.WhileStatement }],
    }
    yield {
      code: 'do {} while (true)',
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.DoWhileStatement }],
    }
    yield {
      code: dedent`
        switch (example) {
          case 1:
            break
        }
      `,
      errors: [{ messageId: 'side-effect', type: AST_NODE_TYPES.SwitchStatement }],
    }
  },
})

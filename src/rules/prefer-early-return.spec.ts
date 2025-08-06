import { tester } from '../spec.ts'
import module from './prefer-early-return.ts'

tester.test(module, {
  invalid: [
    {
      code: 'function foo() { if (foo) bar(); }',
      output: 'function foo() { if (!(foo)) return;bar(); }',
      options: [{ maximumStatements: 0 }],
      errors: [{ messageId: 'prefer' }],
    },
    {
      code: 'function foo() { if (foo) { bar(); baz(); } }',
      output: 'function foo() { if (!(foo)) return; bar(); baz();  }',
      errors: [{ messageId: 'prefer' }],
    },
  ],
})

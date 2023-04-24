import { runTest } from '../spec.js'
import module from './prefer-early-return.js'

runTest({
  module,
  *invalid(cast) {
    yield cast({
      code: 'function foo() { if (foo) bar(); }',
      output: 'function foo() { if (!(foo)) return;bar(); }',
      options: [{ maximumStatements: 0 }],
      errors: [{ messageId: 'prefer' }],
    })
    yield {
      code: 'function foo() { if (foo) { bar(); baz(); } }',
      output: 'function foo() { if (!(foo)) return; bar(); baz();  }',
      errors: [{ messageId: 'prefer' }],
    }
  },
})

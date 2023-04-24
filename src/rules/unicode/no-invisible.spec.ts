import { runTest } from '../../spec.js'
import module from './no-invisible.js'

runTest({
  module,
  *valid() {
    yield 'ABC'
    yield 'false'
  },
  *invalid() {
    yield {
      code: '"\uDB40\uDD00example\uDB40\uDD00"',
      output: '"\\u{E0100}example\\u{E0100}"',
      errors: [{ messageId: 'illegal' }],
    }
  },
})

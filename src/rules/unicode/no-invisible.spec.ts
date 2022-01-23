import { runTest } from '../../spec'
import module from './no-invisible'

runTest({
  module,
  *valid() {
    yield 'ABC'
    yield 'false'
  },
  *invalid() {
    yield {
      code: '"\u{E0100}example\u{E0100}"',
      output: '"\\u{E0100}example\\u{E0100}"',
      errors: [{ messageId: 'illegal' }],
    }
  },
})

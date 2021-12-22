/* eslint-disable no-template-curly-in-string */
import { runTest } from '../spec'
import module from './no-simple-string-interpolation'

runTest({
  module,
  *valid() {
    yield '`${test.test()}`'
  },
  *invalid() {
    yield {
      code: '`${test.\ntest()}`',
      errors: [{ messageId: 'variable' }],
    }
  },
})

/* eslint-disable no-template-curly-in-string */
import { runTest } from '../../spec'
import module from './no-interpolation'

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

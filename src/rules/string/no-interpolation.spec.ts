/* eslint-disable no-template-curly-in-string */
import { runTest } from '../../spec.js'
import module from './no-interpolation.js'

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

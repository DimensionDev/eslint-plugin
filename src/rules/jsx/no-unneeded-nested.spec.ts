/* eslint-disable no-template-curly-in-string */
import { runTest } from '../../spec'
import module from './no-unneeded-nested'

runTest({
  module,
  *invalid() {
    yield { code: '<>123</>', output: '123', errors: [{ messageId: 'invalid' }] }
    yield { code: '<>{}</>', output: '<>{}</>', errors: [{ messageId: 'invalid' }] }
  },
})

/* eslint-disable no-template-curly-in-string */
import { runTest } from '../../spec.js'
import module from './no-unneeded-nested.js'

runTest({
  module,
  *invalid() {
    yield { code: '<>123</>', output: '123', errors: [{ messageId: 'invalid' }] }
    yield { code: '<>{}</>', errors: [{ messageId: 'invalid' }] }
  },
})

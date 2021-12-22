import { runTest } from '../spec'
import module from './no-number-constructor'

runTest({
  module,
  *valid() {
    yield "Number.parseInt('1')"
    yield "Number.parseFloat('1')"
  },
  *invalid() {
    yield { code: 'Number(123)', errors: [{ messageId: 'invalid' }] }
    yield { code: 'new Number(123)', errors: [{ messageId: 'invalid' }] }
  },
})

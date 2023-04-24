import { runTest } from '../spec.js'
import module from './no-then.js'

runTest({
  module,
  *valid() {
    yield 'promise.then'
    yield 'promise.then()'
    yield 'promise.then(resolver, rejecter)'
  },
  *invalid() {
    yield {
      code: 'promise.then(() => 1, () => new Error())',
      errors: [{ messageId: 'invalid' }],
    }
  },
})

import { runTest } from '../spec'
import module from './no-then'

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

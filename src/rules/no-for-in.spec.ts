import { runTest } from '../spec.js'
import module from './no-for-in.js'

runTest({
  module,
  *invalid() {
    yield {
      code: 'for (element in object) {}',
      errors: [{ messageId: 'invalid' }],
    }
  },
})

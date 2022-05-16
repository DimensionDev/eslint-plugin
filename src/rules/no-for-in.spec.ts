import { runTest } from '../spec'
import module from './no-for-in'

runTest({
  module,
  *invalid() {
    yield {
      code: 'for (element in object) {}',
      errors: [{ messageId: 'invalid' }],
    }
  },
})

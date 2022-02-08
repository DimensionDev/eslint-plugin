import { runTest } from '../../spec'
import module from './prefer-from'

runTest({
  module,
  *invalid() {
    yield {
      code: 'new Uint8Array([])',
      output: 'Uint8Array.from([])',
      errors: [{ messageId: 'instead' }],
    }
  },
})

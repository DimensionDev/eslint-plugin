import { runTest } from '../../spec.js'
import module from './prefer-from.js'

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

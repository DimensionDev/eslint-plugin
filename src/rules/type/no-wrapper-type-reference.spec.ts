import { runTest } from '../../spec.js'
import module from './no-wrapper-type-reference.js'

runTest({
  module,
  *invalid() {
    yield {
      code: 'declare const n: BigInt',
      output: 'declare const n: bigint',
      errors: [{ messageId: 'instead', data: { name: 'bigint' } }],
    }
  },
})

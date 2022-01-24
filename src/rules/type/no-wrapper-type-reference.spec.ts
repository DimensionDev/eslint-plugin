import { runTest } from '../../spec'
import module from './no-wrapper-type-reference'

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

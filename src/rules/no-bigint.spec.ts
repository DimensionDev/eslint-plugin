import { runTest } from '../spec'
import module from './no-bigint'

runTest({
  module,
  *invalid() {
    yield { code: '1n', errors: [{ messageId: 'invalid' }] }
    yield { code: 'BigInt(1)', errors: [{ messageId: 'invalid' }] }
    yield { code: 'new BigInt64Array()', errors: [{ messageId: 'invalid' }] }
    yield { code: 'new BigUint64Array()', errors: [{ messageId: 'invalid' }] }
  },
})

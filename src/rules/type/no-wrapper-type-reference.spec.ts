import { tester } from '../../spec.ts'
import module from './no-wrapper-type-reference.ts'

tester.test(module, {
  invalid: [
    {
      code: 'declare const n: BigInt',
      output: 'declare const n: bigint',
      errors: [{ messageId: 'instead', data: { name: 'bigint' } }],
    },
  ],
})

import { tester } from '../../spec.ts'
import module from './prefer-from.ts'

tester.test(module, {
  invalid: [
    {
      code: 'new Uint8Array([])',
      output: 'Uint8Array.from([])',
      errors: [{ messageId: 'instead' }],
    },
  ],
})

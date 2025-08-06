import { tester } from '../spec.ts'
import module from './no-for-in.ts'

tester.test(module, {
  invalid: [
    {
      code: 'for (element in object) {}',
      errors: [{ messageId: 'invalid' }],
    },
  ],
})

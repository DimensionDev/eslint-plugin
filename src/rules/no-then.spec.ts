import { tester } from '../spec.ts'
import module from './no-then.ts'

tester.test(module, {
  valid: ['promise.then', 'promise.then()', 'promise.then(resolver, rejecter)'],
  invalid: [
    {
      code: 'promise.then(() => 1, () => new Error())',
      errors: [{ messageId: 'invalid' }],
    },
  ],
})

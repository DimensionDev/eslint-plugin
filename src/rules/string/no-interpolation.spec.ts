import { tester } from '../../spec.ts'
import module from './no-interpolation.ts'

tester.test(module, {
  valid: ['`${test.test()}`'],
  invalid: [
    {
      code: '`${test.\ntest()}`',
      errors: [{ messageId: 'variable' }],
    },
  ],
})

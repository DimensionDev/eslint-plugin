import { dedent } from 'ts-dedent'
import { tester } from '../spec.ts'
import module from './no-default-error.ts'

tester.test(module, {
  valid: ['throw new TypeError()'],
  invalid: [
    {
      code: 'Error()',
      errors: [{ messageId: 'invalid' }],
    },
    {
      code: 'new Error()',
      errors: [{ messageId: 'invalid' }],
    },
    {
      code: dedent`
        declare function fn(): Error
        throw fn()
      `,
      errors: [{ messageId: 'invalid' }, { messageId: 'invalid' }],
    },
  ],
})

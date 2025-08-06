import { dedent } from 'ts-dedent'
import { tester } from '../spec.ts'
import module from './no-unsafe-date.ts'

tester.test(module, {
  valid: [
    dedent`
      declare const time: Date
      time.toISOString()
    `,
  ],
  invalid: [
    {
      code: dedent`
        declare const time: Date
        time.setSeconds(1)
      `,
      errors: [{ messageId: 'disallow', data: { name: 'setSeconds' } }],
    },
  ],
})

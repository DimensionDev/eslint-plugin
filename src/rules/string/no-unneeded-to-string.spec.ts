import { dedent } from 'ts-dedent'
import { tester } from '../../spec.ts'
import module from './no-unneeded-to-string.ts'

tester.test(module, {
  invalid: [
    {
      code: '"".toString()',
      output: '""',
      errors: [{ messageId: 'invalid' }],
    },
    {
      code: '``.toString()',
      output: '``',
      errors: [{ messageId: 'invalid' }],
    },
    {
      code: dedent`
        declare const input: String
        input.toString()
      `,
      output: dedent`
        declare const input: String
        input
      `,
      errors: [{ messageId: 'invalid' }],
    },
    {
      code: dedent`
        declare const input: string
        input.toString()
      `,
      output: dedent`
        declare const input: string
        input
      `,
      errors: [{ messageId: 'invalid' }],
    },
  ],
})

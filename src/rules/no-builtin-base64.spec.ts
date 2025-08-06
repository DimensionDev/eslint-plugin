import { tester } from '../spec.ts'
import module from './no-builtin-base64.ts'

tester.test(module, {
  invalid: [
    {
      code: 'window.atob(input)',
      output: 'Buffer.from(input, "base64").toString("binary")',
      errors: [{ messageId: 'invalid', data: { name: 'atob' } }],
    },
    {
      code: 'window.btoa(input)',
      output: 'Buffer.from(input, "binary").toString("base64")',
      errors: [{ messageId: 'invalid', data: { name: 'btoa' } }],
    },
  ],
})

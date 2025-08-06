import { tester } from '../../spec.ts'
import module from './no-number-constructor.ts'

tester.test(module, {
  valid: ["Number.parseInt('1')", "Number.parseFloat('1')"],
  invalid: [
    { code: 'Number(123)', errors: [{ messageId: 'invalid' }] },
    { code: 'new Number(123)', errors: [{ messageId: 'invalid' }] },
  ],
})

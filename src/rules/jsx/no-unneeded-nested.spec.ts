import { tester } from '../../spec.ts'
import module from './no-unneeded-nested.ts'

tester.test(module, {
  invalid: [
    { code: '<>123</>', output: '123', errors: [{ messageId: 'invalid' }] },
    { code: '<>{}</>', errors: [{ messageId: 'invalid' }] },
  ],
})

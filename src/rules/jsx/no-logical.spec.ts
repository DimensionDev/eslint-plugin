import { tester } from '../../spec.ts'
import module from './no-logical.ts'

tester.test(module, {
  valid: [{ code: '<a href />', options: [0] }, { code: '<a href={1} />', options: [3] }, '<a>{1 || 2}</a>'],
  invalid: [
    { code: '<a href={1 ? 2 : 3} />', errors: [{ messageId: 'invalid' }] },
    { code: '<a href={1 || 2 || 3} />', errors: [{ messageId: 'invalid' }] },
    { code: '<a>{1 || 2 || 3}</a>', errors: [{ messageId: 'invalid' }] },
  ],
})

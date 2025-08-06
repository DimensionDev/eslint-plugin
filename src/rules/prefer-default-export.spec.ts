import { tester } from '../spec.ts'
import module from './prefer-default-export.ts'

tester.test(module, {
  valid: [
    { code: 'export default 1; export const example = 1;', options: ['at-top'] },
    { code: 'export const example = 1; export default 1;', options: ['at-bottom'] },
  ],
  invalid: [
    {
      code: 'export default 1; export const example = 1;',
      options: ['at-bottom'],
      errors: [{ messageId: 'at-bottom' }],
    },
    {
      code: 'export const example = 1; export default 1;',
      options: ['at-top'],
      errors: [{ messageId: 'at-top' }],
    },
  ],
})

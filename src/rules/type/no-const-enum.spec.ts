import { tester } from '../../spec.ts'
import module from './no-const-enum.ts'

tester.test(module, {
  valid: ['const enum Foo {}', 'const enum Foo {}; export default () => { Foo }'],
  invalid: [
    {
      code: 'export const enum Foo {}',
      errors: [{ messageId: 'invalid' }],
      output: 'export enum Foo {}',
    },
    {
      code: 'const enum Foo {}; export { Foo }',
      errors: [{ messageId: 'invalid' }],
      output: 'enum Foo {}; export { Foo }',
    },
  ],
})

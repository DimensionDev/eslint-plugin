import { runTest } from '../../spec'
import module from './no-const-enum'

runTest({
  module,
  *valid() {
    yield 'const enum Foo {}'
    yield 'const enum Foo {}; export default () => { Foo }'
  },
  *invalid() {
    yield {
      code: 'export const enum Foo {}',
      errors: [{ messageId: 'invalid' }],
      output: 'export enum Foo {}',
    }
    yield {
      code: 'const enum Foo {}; export { Foo }',
      errors: [{ messageId: 'invalid' }],
      output: 'enum Foo {}; export { Foo }',
    }
  },
})

import { runTest } from '../../spec'
import module from './no-const-enum'

runTest({
  module,
  *valid() {
    yield 'enum Foo {}'
  },
  *invalid() {
    yield {
      code: 'const enum Foo {}',
      errors: [{ messageId: 'invalid' }],
      output: 'enum Foo {}',
    }
  },
})

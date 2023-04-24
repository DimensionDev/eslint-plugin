import { dedent } from 'ts-dedent'
import { runTest } from '../spec.js'
import module from './no-default-error.js'

runTest({
  module,
  *valid() {
    yield 'throw new TypeError()'
  },
  *invalid() {
    yield {
      code: 'Error()',
      errors: [{ messageId: 'invalid' }],
    }
    yield {
      code: 'new Error()',
      errors: [{ messageId: 'invalid' }],
    }
    yield {
      code: dedent`
        declare function fn(): Error
        throw fn()
      `,
      errors: [{ messageId: 'invalid' }, { messageId: 'invalid' }],
    }
  },
})

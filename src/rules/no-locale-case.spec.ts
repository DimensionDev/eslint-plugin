import { runTest } from '../spec'
import module from './no-locale-case'

runTest({
  module,
  *valid() {
    yield 'example.toLocaleUpperCase("en-US")'
    yield 'example.toLocaleLowerCase("en-US")'
  },
  *invalid() {
    yield {
      code: 'example.toLocaleUpperCase()',
      output: 'example.toUpperCase()',
      errors: [{ messageId: 'invalid' }],
    }
    yield {
      code: 'example.toLocaleLowerCase()',
      output: 'example.toLowerCase()',
      errors: [{ messageId: 'invalid' }],
    }
  },
})

import { runTest } from '../../spec.js'
import module from './no-locale-case.js'

runTest({
  module,
  *valid() {
    yield 'example.toLocaleUpperCase("en-US")'
    yield 'example.toLocaleLowerCase("en-US")'
  },
  *invalid(cast) {
    yield cast({
      code: 'example.toLocaleUpperCase()',
      output: 'example.toUpperCase()',
      errors: [{ messageId: 'instead', data: { name: 'Upper' } }],
    })
    yield cast({
      code: 'example.toLocaleLowerCase()',
      output: 'example.toLowerCase()',
      errors: [{ messageId: 'instead', data: { name: 'Lower' } }],
    })
  },
})

import { runTest } from '../../spec.js'
import module from './no-data-url.js'

runTest({
  module,
  *invalid() {
    yield {
      code: '<a href="data:" />',
      errors: [{ messageId: 'disallow' }],
    }
    yield {
      code: '"data:"',
      errors: [{ messageId: 'disallow' }],
    }
    yield {
      code: '`data:`',
      errors: [{ messageId: 'disallow' }],
    }
  },
})

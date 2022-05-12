import { runTest } from '../../spec'
import module from './no-data-url'

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

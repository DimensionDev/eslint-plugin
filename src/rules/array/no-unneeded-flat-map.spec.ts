import { runTest } from '../../spec'
import module from './no-unneeded-flat-map'

runTest({
  module,
  *invalid() {
    yield {
      code: '[].flatMap((x) => x)',
      output: '[].flat()',
      errors: [{ messageId: 'invalid' }],
    }
    yield {
      code: '[].flatMap((x) => { return x })',
      output: '[].flat()',
      errors: [{ messageId: 'invalid' }],
    }
    yield {
      code: '[].flatMap(function (x) { return x })',
      output: '[].flat()',
      errors: [{ messageId: 'invalid' }],
    }
  },
})

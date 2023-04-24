import { runTest } from '../../spec.js'
import module from './no-unneeded-flat-map.js'

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

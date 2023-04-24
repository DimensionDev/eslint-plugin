import { runTest } from '../../spec.js'
import module from './no-simple-template-literal.js'

runTest({
  module,
  *invalid() {
    yield {
      code: '`example\\t`',
      output: '"example\\t"',
      errors: [{ messageId: 'invalid' }],
    }
    yield {
      // eslint-disable-next-line no-template-curly-in-string
      code: '`${example}`',
      output: 'example',
      errors: [{ messageId: 'invalid' }],
    }
    yield {
      code: '({ [`example`]: null, foo: null })',
      output: '({ "example": null, foo: null })',
      errors: [{ messageId: 'invalid' }],
    }
  },
})

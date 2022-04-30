import { runTest } from '../../spec'
import module from './no-empty-literal'

runTest({
  module,
  *valid() {
    yield 'const foo = [bar]'
    yield 'const foo = { bar }'
  },
  *invalid() {
    yield {
      code: 'const foo = []',
      errors: [{ messageId: 'invalid', data: { type: 'array' } }],
    }
    yield {
      code: 'const foo = {}',
      errors: [{ messageId: 'invalid', data: { type: 'object' } }],
    }
  },
})

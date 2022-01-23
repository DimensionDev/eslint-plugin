import { runTest } from '../spec'
import module from './no-force-cast-via-top-type'

runTest({
  module,
  *valid() {
    yield 'const foo = bar as any'
    yield 'const foo = bar as unknown'
  },
  *invalid() {
    yield {
      code: 'const foo = bar as any as Baz',
      errors: [{ messageId: 'invalid', data: { type: 'any' } }],
    }
    yield {
      code: 'const foo = bar as unknown as Baz',
      errors: [{ messageId: 'invalid', data: { type: 'unknown' } }],
    }
  },
})

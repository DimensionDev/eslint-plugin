import { runTest } from '../../spec'
import module from './no-instanceof-wrapper'

runTest({
  module,
  *valid() {
    yield 'typeof x === "boolean"'
    yield 'function foo(Boolean) { x instanceof Boolean }'
    yield 'Array.isArray(x)'
    yield 'function foo(Array) { x instanceof Array }'
  },
  *invalid(cast) {
    yield cast({
      code: 'x instanceof Boolean',
      output: 'typeof x === "boolean"',
      errors: [{ messageId: 'primitive', data: { typeName: 'boolean' } }],
    })
    yield cast({
      code: 'x instanceof Array',
      output: 'Array.isArray(x)',
      errors: [{ messageId: 'array' }],
    })
  },
})

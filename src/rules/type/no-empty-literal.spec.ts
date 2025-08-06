import { tester } from '../../spec.ts'
import module from './no-empty-literal.ts'

tester.test(module, {
  valid: ['const foo = [bar]', 'const foo = { bar }'],
  invalid: [
    {
      code: 'const foo = []',
      errors: [{ messageId: 'invalid', data: { type: 'array' } }],
    },
    {
      code: 'const foo = {}',
      errors: [{ messageId: 'invalid', data: { type: 'object' } }],
    },
  ],
})

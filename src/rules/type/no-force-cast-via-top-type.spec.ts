import { tester } from '../../spec.ts'
import module from './no-force-cast-via-top-type.ts'

tester.test(module, {
  valid: ['const foo = bar as any', 'const foo = bar as unknown'],
  invalid: [
    {
      code: 'const foo = bar as any as Baz',
      errors: [{ messageId: 'invalid', data: { type: 'any' } }],
    },
    {
      code: 'const foo = bar as unknown as Baz',
      errors: [{ messageId: 'invalid', data: { type: 'unknown' } }],
    },
  ],
})

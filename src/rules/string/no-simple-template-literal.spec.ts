import { tester } from '../../spec.ts'
import module from './no-simple-template-literal.ts'

tester.test(module, {
  invalid: [
    {
      code: '`example\\t`',
      errors: [{ messageId: 'invalid', suggestions: [{ messageId: 'fix', output: '"example\\t"' }] }],
    },
    {
      code: '`${example}`',
      errors: [{ messageId: 'invalid', suggestions: [{ messageId: 'fix', output: 'String(example)' }] }],
    },
    {
      code: 'const n: number = 5; const s = `${n}`',
      errors: [
        {
          messageId: 'invalid',
          suggestions: [{ messageId: 'fix', output: 'const n: number = 5; const s = String(n)' }],
        },
      ],
    },
    {
      code: '({ [`example`]: null, foo: null })',
      errors: [
        {
          messageId: 'invalid',
          suggestions: [{ messageId: 'fix', output: '({ "example": null, foo: null })' }],
        },
      ],
    },
  ],
})

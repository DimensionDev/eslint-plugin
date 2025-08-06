import { tester } from '../../spec.ts'
import module from './no-simple-template-literal.ts'

tester.test(module, {
  invalid: [
    { code: '`example\\t`', output: '"example\\t"', errors: [{ messageId: 'invalid' }] },
    { code: '`${example}`', output: 'example', errors: [{ messageId: 'invalid' }] },
    {
      code: '({ [`example`]: null, foo: null })',
      output: '({ "example": null, foo: null })',
      errors: [{ messageId: 'invalid' }],
    },
  ],
})

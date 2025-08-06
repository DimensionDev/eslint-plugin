import { tester } from '../../spec.ts'
import module from './no-locale-case.ts'

tester.test(module, {
  valid: ['example.toLocaleUpperCase("en-US")', 'example.toLocaleLowerCase("en-US")'],
  invalid: [
    {
      code: 'example.toLocaleUpperCase()',
      output: 'example.toUpperCase()',
      errors: [{ messageId: 'instead', data: { name: 'Upper' } }],
    },
    {
      code: 'example.toLocaleLowerCase()',
      output: 'example.toLowerCase()',
      errors: [{ messageId: 'instead', data: { name: 'Lower' } }],
    },
  ],
})

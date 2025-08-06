import { tester } from '../../spec.ts'
import module from './no-unneeded-flat-map.ts'

tester.test(module, {
  invalid: [
    {
      code: '[].flatMap((x) => x)',
      output: '[].flat()',
      errors: [{ messageId: 'invalid' }],
    },
    {
      code: '[].flatMap((x) => { return x })',
      output: '[].flat()',
      errors: [{ messageId: 'invalid' }],
    },
    {
      code: '[].flatMap(function (x) { return x })',
      output: '[].flat()',
      errors: [{ messageId: 'invalid' }],
    },
  ],
})

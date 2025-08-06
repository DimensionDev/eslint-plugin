import { tester } from '../../spec.ts'
import module from './no-template-literal.ts'

tester.test(module, {
  valid: ['<a>123 456</a>', '<a href={`Test`} />'],
  invalid: [
    {
      code: '<a>123 {`4${5}6`} 789</a>',
      output: '<a>123 4{5}6 789</a>',
      errors: [{ messageId: 'invalid' }],
    },
    {
      code: '<a>{`123`} {`456`}</a>',
      output: '<a>123 456</a>',
      errors: [{ messageId: 'invalid' }, { messageId: 'invalid' }],
    },
    {
      code: '<a>{`123 456`}</a>',
      output: '<a>123 456</a>',
      errors: [{ messageId: 'invalid' }],
    },
  ],
})

import { tester } from '../spec.ts'
import module from './prefer-timer-id.ts'

tester.test(module, {
  valid: ['const timer = setTimeout(() => {}, 1000)', 'setTimeout(() => {})', 'setTimeout(() => {}, 0)'],
  invalid: [
    {
      code: 'setTimeout(() => {}, 1000)',
      errors: [
        {
          messageId: 'assign',
          suggestions: [{ messageId: 'fix', output: 'const timer = setTimeout(() => {}, 1000)' }],
        },
      ],
    },
    {
      code: 'setInterval(() => {})',
      errors: [
        {
          messageId: 'assign',
          suggestions: [{ messageId: 'fix', output: 'const timer = setInterval(() => {})' }],
        },
      ],
    },
    {
      code: 'setInterval(() => {}, 0)',
      errors: [
        {
          messageId: 'assign',
          suggestions: [{ messageId: 'fix', output: 'const timer = setInterval(() => {}, 0)' }],
        },
      ],
    },
    {
      code: 'setInterval(() => {}, 1000)',
      errors: [
        {
          messageId: 'assign',
          suggestions: [{ messageId: 'fix', output: 'const timer = setInterval(() => {}, 1000)' }],
        },
      ],
    },
  ],
})

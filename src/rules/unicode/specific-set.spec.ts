import { tester } from '../../spec.ts'
import module from './specific-set.ts'

tester.test(module, {
  valid: [
    `''`,
    `'ABC'`,
    '1',
    { code: '// \u4E2D\u6587', options: [{ only: 'code' }] },
    { code: '\u4E2D\u6587', options: [{ only: 'comment' }] },
  ],
  invalid: [
    { code: '\u4E2D\u6587', errors: [{ messageId: 'illegal' }] },
    { code: 'class T { #\u4E2D\u6587 }', errors: [{ messageId: 'illegal' }] },
    { code: '#\u4E2D\u6587', errors: [{ messageId: 'illegal' }] },
    { code: '// \u4E2D\u6587', errors: [{ messageId: 'illegal' }] },
    {
      code: '"\u4E2D\u6587"',
      output: '"\\u4E2D\\u6587"',
      errors: [{ messageId: 'illegal', data: { text: '"\\u4E2D\\u6587"' } }],
    },
    {
      code: '`\u4E2D\u6587`',
      output: '`\\u4E2D\\u6587`',
      errors: [{ messageId: 'illegal' }],
    },
    {
      code: '<a>\u4E2D\u6587</a>',
      output: '<a>&#x4E2D;&#x6587;</a>',
      errors: [{ messageId: 'illegal' }],
    },
    {
      code: '/\u2014/u',
      output: '/\\u2014/u',
      errors: [{ messageId: 'illegal' }],
    },
  ],
})

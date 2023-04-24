import { runTest } from '../../spec.js'
import module from './specific-set.js'

runTest({
  module,
  *valid(cast) {
    yield `''`
    yield `'ABC'`
    yield '1'
    yield cast({ code: '// \u4E2D\u6587', options: [{ only: 'code' }] })
    yield cast({ code: '\u4E2D\u6587', options: [{ only: 'comment' }] })
  },
  *invalid() {
    for (const code of ['\u4E2D\u6587', '#\u4E2D\u6587', '// \u4E2D\u6587']) {
      yield { code, errors: [{ messageId: 'illegal' }] }
    }
    yield {
      code: '"\u4E2D\u6587"',
      output: '"\\u4E2D\\u6587"',
      errors: [{ messageId: 'illegal', data: { text: '"\\u4E2D\\u6587"' } }],
    }
    yield {
      code: '`\u4E2D\u6587`',
      output: '`\\u4E2D\\u6587`',
      errors: [{ messageId: 'illegal' }],
    }
    yield {
      code: '<a>\u4E2D\u6587</a>',
      output: '<a>&#x4E2D;&#x6587;</a>',
      errors: [{ messageId: 'illegal' }],
    }
    yield {
      code: '/\u2014/u',
      output: '/\\u2014/u',
      errors: [{ messageId: 'illegal' }],
    }
  },
})

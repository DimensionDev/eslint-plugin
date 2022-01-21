import { runTest } from '../spec'
import module from './unicode-specific-set'

runTest({
  module,
  *valid(cast) {
    yield `''`
    yield `'ABC'`
    yield '1'
    yield cast({ code: '// 中文', options: [{ only: 'code' }] })
    yield cast({ code: '中文', options: [{ only: 'comment' }] })
  },
  *invalid() {
    for (const code of ['中文', '#中文', '// 中文']) {
      yield { code, errors: [{ messageId: 'illegal' }] }
    }
    yield {
      code: '"中文"',
      output: '"\\u4E2D\\u6587"',
      errors: [{ messageId: 'illegal', data: { text: '"\\u4E2D\\u6587"' } }],
    }
    yield {
      code: '`中文`',
      output: '`\\u4E2D\\u6587`',
      errors: [{ messageId: 'illegal' }],
    }
    yield {
      code: '<a>中文</a>',
      output: '<a>&#x4E2D;&#x6587;</a>',
      errors: [{ messageId: 'illegal' }],
    }
    yield {
      code: '/—/u',
      output: '/\\u2014/u',
      errors: [{ messageId: 'illegal' }],
    }
  },
})

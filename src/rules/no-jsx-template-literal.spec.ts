/* eslint-disable no-template-curly-in-string */
import { runTest } from '../spec'
import module from './no-jsx-template-literal'

runTest({
  module,
  *valid() {
    yield '<a>123 456</a>'
    yield '<a href={`Test`} />'
  },
  *invalid() {
    yield {
      code: '<a>123 {`4${5}6`} 789</a>',
      output: '<a>123 4{5}6 789</a>',
      errors: [{ messageId: 'invalid' }],
    }
    yield {
      code: '<a>{`123`} {`456`}</a>',
      output: '<a>123 456</a>',
      errors: [{ messageId: 'invalid' }, { messageId: 'invalid' }],
    }
    yield {
      code: '<a>{`123 456`}</a>',
      output: '<a>123 456</a>',
      errors: [{ messageId: 'invalid' }],
    }
  },
})

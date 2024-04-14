import { runTest } from '../spec.js'
import module from './prefer-timer-id.js'

runTest({
  module,
  *valid() {
    yield 'const timer = setTimeout(() => {}, 1000)'
    yield 'setTimeout(() => {})'
    yield 'setTimeout(() => {}, 0)'
  },
  *invalid() {
    yield {
      code: 'setTimeout(() => {}, 1000)',
      errors: [
        {
          messageId: 'assign',
          suggestions: [{ messageId: 'fix', output: 'const timer = setTimeout(() => {}, 1000)' }],
        },
      ],
    }
    yield {
      code: 'setInterval(() => {})',
      errors: [
        {
          messageId: 'assign',
          suggestions: [{ messageId: 'fix', output: 'const timer = setInterval(() => {})' }],
        },
      ],
    }
    yield {
      code: 'setInterval(() => {}, 0)',
      errors: [
        {
          messageId: 'assign',
          suggestions: [{ messageId: 'fix', output: 'const timer = setInterval(() => {}, 0)' }],
        },
      ],
    }
    yield {
      code: 'setInterval(() => {}, 1000)',
      errors: [
        {
          messageId: 'assign',
          suggestions: [{ messageId: 'fix', output: 'const timer = setInterval(() => {}, 1000)' }],
        },
      ],
    }
  },
})

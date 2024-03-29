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
    yield { code: 'setTimeout(() => {}, 1000)', errors: [{ messageId: 'assign' }] }
    yield { code: 'setInterval(() => {})', errors: [{ messageId: 'assign' }] }
    yield { code: 'setInterval(() => {}, 0)', errors: [{ messageId: 'assign' }] }
    yield { code: 'setInterval(() => {}, 1000)', errors: [{ messageId: 'assign' }] }
  },
})

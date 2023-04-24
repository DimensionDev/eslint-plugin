import { runTest } from '../spec.js'
import module from './no-timer.js'

runTest({
  module,
  *invalid() {
    yield { code: 'setTimeout()', errors: [{ messageId: 'invalid' }] }
    yield { code: 'window.setTimeout()', errors: [{ messageId: 'invalid' }] }
    yield { code: 'window["setTimeout"]()', errors: [{ messageId: 'invalid' }] }
    yield { code: 'process.nextTick()', errors: [{ messageId: 'invalid' }] }
  },
})

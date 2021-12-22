import { runTest } from '../spec'
import module from './no-timer'

runTest({
  module,
  *invalid() {
    yield { code: 'setTimeout()', errors: [{ messageId: 'invalid' }] }
    yield { code: 'window.setTimeout()', errors: [{ messageId: 'invalid' }] }
    yield { code: 'window["setTimeout"]()', errors: [{ messageId: 'invalid' }] }
    yield { code: 'process.nextTick()', errors: [{ messageId: 'invalid' }] }
  },
})

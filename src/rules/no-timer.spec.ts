import { tester } from '../spec.ts'
import module from './no-timer.ts'

tester.test(module, {
  invalid: [
    { code: 'setTimeout()', errors: [{ messageId: 'invalid' }] },
    { code: 'window.setTimeout()', errors: [{ messageId: 'invalid' }] },
    { code: 'window["setTimeout"]()', errors: [{ messageId: 'invalid' }] },
    { code: 'process.nextTick()', errors: [{ messageId: 'invalid' }] },
  ],
})

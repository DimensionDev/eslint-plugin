import { tester } from '../../spec.ts'
import module from './no-invisible.ts'

tester.test(module, {
  valid: ['ABC', 'false'],
  invalid: [
    {
      code: '"\uDB40\uDD00example\uDB40\uDD00"',
      output: '"\\u{E0100}example\\u{E0100}"',
      errors: [{ messageId: 'illegal' }],
    },
  ],
})

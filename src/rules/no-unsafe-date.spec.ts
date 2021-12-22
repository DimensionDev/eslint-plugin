import dedent from 'ts-dedent'
import { runTest } from '../spec'
import module from './no-unsafe-date'

runTest({
  module,
  *valid() {
    yield dedent`
      declare const time: Date
      time.toISOString()
    `
  },
  *invalid() {
    yield {
      code: dedent`
        declare const time: Date
        time.setSeconds(1)
      `,
      errors: [{ messageId: 'disallow', data: { name: 'setSeconds' } }],
    }
  },
})

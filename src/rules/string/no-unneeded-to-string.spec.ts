import dedent from 'ts-dedent'
import { runTest } from '../../spec'
import module from './no-unneeded-to-string'

runTest({
  module,
  *invalid() {
    yield {
      code: '"".toString()',
      output: '""',
      errors: [{ messageId: 'invalid' }],
    }
    yield {
      code: '``.toString()',
      output: '``',
      errors: [{ messageId: 'invalid' }],
    }
    yield {
      code: dedent`
        declare const input: String
        input.toString()
      `,
      output: dedent`
        declare const input: String
        input
      `,
      errors: [{ messageId: 'invalid' }],
    }
    yield {
      code: dedent`
        declare const input: string
        input.toString()
      `,
      output: dedent`
        declare const input: string
        input
      `,
      errors: [{ messageId: 'invalid' }],
    }
  },
})

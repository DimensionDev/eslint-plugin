import { runTest } from '../spec.js'
import module from './no-builtin-base64.js'

runTest({
  module,
  *invalid() {
    yield {
      code: 'window.atob(input)',
      output: 'Buffer.from(input, "base64").toString("binary")',
      errors: [{ messageId: 'invalid', data: { name: 'atob' } }],
    }
    yield {
      code: 'window.btoa(input)',
      output: 'Buffer.from(input, "binary").toString("base64")',
      errors: [{ messageId: 'invalid', data: { name: 'btoa' } }],
    }
  },
})

import { dedent } from 'ts-dedent'
import { runTest } from '../../spec.js'
import module from './no-persistent-storage.js'

runTest({
  module,
  *valid() {
    yield dedent`
      const localStorage = 1
      localStorage
    `
  },
  *invalid() {
    yield { code: 'localStorage', errors: [{ messageId: 'invalid' }] }
    yield { code: 'document.cookie', errors: [{ messageId: 'invalid' }] }
    yield { code: 'window.document.cookie', errors: [{ messageId: 'invalid' }] }
  },
})

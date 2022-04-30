import dedent from 'ts-dedent'
import { runTest } from '../../spec'
import module from './no-persistent-storage'

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

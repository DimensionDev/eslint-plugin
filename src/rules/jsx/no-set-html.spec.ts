import { runTest } from '../../spec.js'
import module from './no-set-html.js'

runTest({
  module,
  *invalid() {
    yield { code: '<a dangerouslySetInnerHTML />', errors: [{ messageId: 'invalid' }] }
  },
})

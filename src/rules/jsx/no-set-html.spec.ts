import { runTest } from '../../spec'
import module from './no-set-html'

runTest({
  module,
  *invalid() {
    yield { code: '<a dangerouslySetInnerHTML />', errors: [{ messageId: 'invalid' }] }
  },
})

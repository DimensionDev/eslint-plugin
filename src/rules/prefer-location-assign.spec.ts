import { runTest } from '../spec'
import module from './prefer-location-assign'

runTest({
  module,
  *invalid() {
    yield {
      code: "location = ''",
      output: "location.assign('')",
      errors: [{ messageId: 'enforce' }],
    }
    yield {
      code: "location.href = ''",
      output: "location.assign('')",
      errors: [{ messageId: 'enforce' }],
    }
  },
})

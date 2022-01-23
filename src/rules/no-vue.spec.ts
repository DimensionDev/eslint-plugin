import { runTest } from '../spec'
import module from './no-vue'

runTest({
  module,
  *invalid() {
    yield {
      code: 'import "vue"',
      errors: [{ messageId: 'disallow', data: { name: '"vue"' } }],
    }
  },
})

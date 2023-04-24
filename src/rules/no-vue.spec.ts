import { runTest } from '../spec.js'
import module from './no-vue.js'

runTest({
  module,
  *invalid() {
    yield {
      code: 'import "vue"',
      errors: [{ messageId: 'disallow', data: { name: '"vue"' } }],
    }
  },
})

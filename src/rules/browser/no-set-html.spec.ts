import { runTest } from '../../spec.js'
import module from './no-set-html.js'

runTest({
  module,
  *invalid() {
    yield {
      code: "element.innerHTML = ''",
      errors: [{ messageId: 'invalid', data: { property: 'innerHTML' } }],
    }
    yield {
      code: "element.outerHTML = ''",
      errors: [{ messageId: 'invalid', data: { property: 'outerHTML' } }],
    }
  },
})

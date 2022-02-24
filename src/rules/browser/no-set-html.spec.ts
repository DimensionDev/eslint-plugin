import { runTest } from '../../spec'
import module from './no-set-html'

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

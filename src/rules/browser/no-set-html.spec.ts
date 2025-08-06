import { tester } from '../../spec.ts'
import module from './no-set-html.ts'

tester.test(module, {
  invalid: [
    { code: "element.innerHTML = ''", errors: [{ messageId: 'invalid', data: { property: 'innerHTML' } }] },
    { code: "element.outerHTML = ''", errors: [{ messageId: 'invalid', data: { property: 'outerHTML' } }] },
  ],
})

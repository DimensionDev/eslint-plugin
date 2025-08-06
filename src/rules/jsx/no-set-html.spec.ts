import { tester } from '../../spec.ts'
import module from './no-set-html.ts'

tester.test(module, {
  invalid: [{ code: '<a dangerouslySetInnerHTML />', errors: [{ messageId: 'invalid' }] }],
})

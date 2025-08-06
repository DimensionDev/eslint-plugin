import { tester } from '../../spec.ts'
import module from './no-data-url.ts'

tester.test(module, {
  invalid: [
    { code: '<a href="data:" />', errors: [{ messageId: 'disallow' }] },
    { code: '"data:"', errors: [{ messageId: 'disallow' }] },
    { code: '`data:`', errors: [{ messageId: 'disallow' }] },
  ],
})

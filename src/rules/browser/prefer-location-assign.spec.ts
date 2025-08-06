import module from './prefer-location-assign.ts'
import { tester } from '../../spec.ts'

tester.test(module, {
  invalid: [
    {
      code: "window.location = ''",
      output: "window.location.assign('')",
      errors: [{ messageId: 'instead' }],
    },
    {
      code: "window.location.href = ''",
      output: "window.location.assign('')",
      errors: [{ messageId: 'instead', data: { name: 'href' } }],
    },
    {
      code: 'window.location.port = 8080',
      errors: [{ messageId: 'instead', data: { name: 'port' } }],
    },
  ],
})

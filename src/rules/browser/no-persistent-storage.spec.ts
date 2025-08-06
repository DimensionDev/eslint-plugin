import { tester } from '../../spec.ts'
import module from './no-persistent-storage.ts'

tester.test(module, {
  valid: [`const localStorage = 1; localStorage`],
  invalid: [
    {
      code: 'localStorage',
      errors: [{ messageId: 'invalid' }],
    },
    {
      code: 'document.cookie',
      errors: [{ messageId: 'invalid' }],
    },
    {
      code: 'window.document.cookie',
      errors: [{ messageId: 'invalid' }],
    },
  ],
})

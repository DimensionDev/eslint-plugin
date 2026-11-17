import { tester } from '../../spec.ts'
import module from './prefer-from.ts'

tester.test(module, {
  valid: [
    'new Uint8Array(16)',
    'new Uint8Array(new ArrayBuffer(16))',
    'new Uint8Array("123")',
    'new Uint8Array(elements)',
  ],
  invalid: [
    {
      code: 'new Array(3)',
      errors: [{ messageId: 'avoid' }],
    },
    {
      code: 'new Array(elements)',
      errors: [{ messageId: 'avoid' }],
    },
    {
      code: 'new Array(1, 2)',
      errors: [{ messageId: 'avoid' }],
    },
    {
      code: 'new Array()',
      errors: [{ messageId: 'avoid' }],
    },
    {
      code: 'new Uint8Array([])',
      output: 'Uint8Array.from([])',
      errors: [{ messageId: 'instead' }],
    },
    {
      code: 'new Uint8Array(new Set([1, 2]))',
      output: 'Uint8Array.from(new Set([1, 2]))',
      errors: [{ messageId: 'instead' }],
    },
    {
      code: 'declare const iterable: Iterable<number>; new Uint8Array(iterable)',
      output: 'declare const iterable: Iterable<number>; Uint8Array.from(iterable)',
      errors: [{ messageId: 'instead' }],
    },
  ],
})

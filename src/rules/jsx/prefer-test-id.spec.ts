import { tester } from '../../spec.ts'
import module from './prefer-test-id.ts'

tester.test(module, {
  valid: [
    '<example />',
    '<a data-test-id="bar" />',
    '<a data-test-id={bar} />',
    '<a disabled />',
    '<a readonly />',
    '<link href="https://example.com" />',
    '<base href="https://example.com" />',
    '<example onChange={handleChange} data-test-id="bar" />',
  ],
  invalid: [
    {
      code: '<a>Download</a>',
      errors: [{ messageId: 'element', data: { element: 'a', id: 'data-test-id' } }],
    },
    {
      code: '<a disabled={hidden}>Download</a>',
      errors: [{ messageId: 'element', data: { element: 'a', id: 'data-test-id' } }],
    },
    {
      code: '<example onChange={handleChange} />',
      errors: [{ messageId: 'attribute', data: { element: 'example', name: 'onChange', id: 'data-test-id' } }],
    },
    {
      code: '<example editable />',
      errors: [{ messageId: 'attribute', data: { element: 'example', name: 'editable', id: 'data-test-id' } }],
    },
  ],
})

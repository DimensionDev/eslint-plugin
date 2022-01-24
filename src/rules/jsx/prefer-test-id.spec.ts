/* eslint-disable no-template-curly-in-string */
import { runTest } from '../../spec'
import module from './prefer-test-id'

runTest({
  module,
  *valid() {
    yield '<example />'
    yield '<a data-test-id="bar" />'
    yield '<a data-test-id={bar} />'
    yield '<a disabled />'
    yield '<a readonly />'
    yield '<link href="https://example.com" />'
    yield '<base href="https://example.com" />'
    yield '<example onChange={handleChange} data-test-id="bar" />'
  },
  *invalid(cast) {
    yield cast({
      code: '<a>Download</a>',
      errors: [{ messageId: 'element', data: { element: 'a', id: 'data-test-id' } }],
    })
    yield cast({
      code: '<a disabled={hidden}>Download</a>',
      errors: [{ messageId: 'element', data: { element: 'a', id: 'data-test-id' } }],
    })
    yield cast({
      code: '<example onChange={handleChange} />',
      errors: [{ messageId: 'attribute', data: { element: 'example', name: 'onChange', id: 'data-test-id' } }],
    })
    yield cast({
      code: '<example editable />',
      errors: [{ messageId: 'attribute', data: { element: 'example', name: 'editable', id: 'data-test-id' } }],
    })
  },
})

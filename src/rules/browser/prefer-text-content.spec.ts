import { runTest } from '../../spec.js'
import module from './prefer-text-content.js'

runTest({
  module,
  *invalid(cast) {
    yield cast({
      code: 'declare const element: HTMLElement; element.innerText;',
      errors: [
        {
          messageId: 'instead',
          suggestions: [
            {
              messageId: 'suggest',
              output: 'declare const element: HTMLElement; element.textContent;',
            },
          ],
        },
      ],
    })
    yield cast({
      code: 'declare const element: HTMLElement; const { innerText } = element;',
      errors: [
        {
          messageId: 'instead',
          suggestions: [
            {
              messageId: 'suggest',
              output: 'declare const element: HTMLElement; const { textContent: innerText } = element;',
            },
          ],
        },
      ],
    })
  },
})

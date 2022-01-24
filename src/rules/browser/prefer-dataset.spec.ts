import dedent from 'ts-dedent'
import { runTest } from '../../spec'
import module from './prefer-dataset'

runTest({
  module,
  *valid() {
    yield dedent`
      declare const element: HTMLElement | null
      element?.getAttribute("id")
    `
  },
  *invalid(cast) {
    yield cast({
      code: dedent`
        declare const element: HTMLElement | null
        element?.getAttribute("data-test-id")
        element?.setAttribute("data-test-id", "")
        element?.hasAttribute("data-test-id")
        element?.removeAttribute("data-test-id")
      `,
      output: dedent`
        declare const element: HTMLElement | null
        element?.dataset.testId
        element?.dataset.testId = ""
        Object.hasOwn(element?.dataset, "testId")
        delete element?.dataset.testId
      `,
      errors: [
        { messageId: 'instead', data: { methodName: 'getAttribute' } },
        { messageId: 'instead', data: { methodName: 'setAttribute' } },
        { messageId: 'instead', data: { methodName: 'hasAttribute' } },
        { messageId: 'instead', data: { methodName: 'removeAttribute' } },
      ],
    })
    yield cast({
      code: 'document.getAttribute("data-test-id")',
      output: 'document.dataset.testId',
      errors: [{ messageId: 'instead', data: { methodName: 'getAttribute' } }],
    })
  },
})

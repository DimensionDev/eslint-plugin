import dedent from 'ts-dedent'
import { runTest } from '../../spec'
import module from './prefer-modern-dom-apis'

runTest({
  module,
  *invalid(cast) {
    yield cast({
      code: dedent`
        declare const element: HTMLElement | null
        declare const parentNode: HTMLElement | null
        declare const referenceNode: HTMLElement | null
        element?.appendChild(child)
        element?.removeChild(foo)
        element?.removeChild(await foo)
        element.replaceChild(newChildNode, oldChildNode)
        parentNode.insertBefore(newNode, referenceNode)
        referenceNode?.insertAdjacentText("beforebegin", "text")
        referenceNode?.insertAdjacentText("afterbegin", "text")
        referenceNode?.insertAdjacentText("beforeend", "text")
        referenceNode?.insertAdjacentText("afterend", "text")
        referenceNode?.insertAdjacentElement("beforebegin", newNode)
        element?.getAttribute("data-test-id")
        element?.setAttribute("data-test-id", "")
        element?.hasAttribute("data-test-id")
        element?.removeAttribute("data-test-id")
      `,
      output: dedent`
        declare const element: HTMLElement | null
        declare const parentNode: HTMLElement | null
        declare const referenceNode: HTMLElement | null
        element?.append(child)
        foo.remove()
        (await foo).remove()
        oldChildNode.replaceWith(newChildNode)
        referenceNode.before(newNode)
        referenceNode?.before("text")
        referenceNode?.prepend("text")
        referenceNode?.append("text")
        referenceNode?.after("text")
        referenceNode?.before(newNode)
        element?.dataset.testId
        element?.dataset.testId = ""
        Object.hasOwn(element?.dataset, "testId")
        delete element?.dataset.testId
      `,
      errors: [
        { messageId: 'appendChild' },
        { messageId: 'removeChild' },
        { messageId: 'removeChild' },
        { messageId: 'replaceChild' },
        { messageId: 'insertBefore' },
        { messageId: 'insertAdjacentText', data: { method: 'before', action: '"beforebegin"' } },
        { messageId: 'insertAdjacentText', data: { method: 'prepend', action: '"afterbegin"' } },
        { messageId: 'insertAdjacentText', data: { method: 'append', action: '"beforeend"' } },
        { messageId: 'insertAdjacentText', data: { method: 'after', action: '"afterend"' } },
        { messageId: 'insertAdjacentElement', data: { method: 'before', action: '"beforebegin"' } },
        { messageId: 'getAttribute', data: { path: '.testId', name: '"data-test-id"' } },
        { messageId: 'setAttribute', data: { path: '.testId', name: '"data-test-id"' } },
        { messageId: 'hasAttribute', data: { path: '.testId', name: '"data-test-id"' } },
        { messageId: 'removeAttribute', data: { path: '.testId', name: '"data-test-id"' } },
      ],
    })
  },
})

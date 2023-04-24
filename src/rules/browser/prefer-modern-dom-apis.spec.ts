import { dedent } from 'ts-dedent'
import { runTest } from '../../spec.js'
import module from './prefer-modern-dom-apis.js'

// cspell:ignore beforebegin afterbegin beforeend afterend
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
      `,
      errors: [
        { messageId: 'instead', data: { modern: 'append', legacy: 'appendChild' } },
        { messageId: 'instead', data: { modern: 'remove', legacy: 'removeChild' } },
        { messageId: 'instead', data: { modern: 'remove', legacy: 'removeChild' } },
        { messageId: 'instead', data: { modern: 'replaceWith', legacy: 'replaceChild' } },
        { messageId: 'instead', data: { modern: 'before', legacy: 'insertBefore' } },
        { messageId: 'instead', data: { modern: 'before', legacy: 'insertAdjacentText' } },
        { messageId: 'instead', data: { modern: 'prepend', legacy: 'insertAdjacentText' } },
        { messageId: 'instead', data: { modern: 'append', legacy: 'insertAdjacentText' } },
        { messageId: 'instead', data: { modern: 'after', legacy: 'insertAdjacentText' } },
        { messageId: 'instead', data: { modern: 'before', legacy: 'insertAdjacentElement' } },
      ],
    })
  },
})

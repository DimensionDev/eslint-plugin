import { dedent } from 'ts-dedent'
import { runTest } from '../../spec.js'
import module from './prefer-event-target.js'

runTest({
  module,
  *valid() {
    yield "window.addEventListener('click', handleClick)"
    yield "window.removeEventListener('click', handleClick)"
    yield "window.removeEventListener('click', getListener())"
  },
  *invalid() {
    yield {
      code: dedent`
        const reader = new FileReader()
        reader.onload = resolve
        reader?.['onerror'] = reject
        reader.onerror = null
      `,
      output: dedent`
        const reader = new FileReader()
        reader.addEventListener("load", resolve)
        reader?.addEventListener("error", reject)
        reader.onerror = null
      `,
      errors: [
        { messageId: 'instead', data: { replacement: 'add', methodName: 'onload' } },
        { messageId: 'instead', data: { replacement: 'add', methodName: 'onerror' } },
        { messageId: 'instead', data: { replacement: 'remove', methodName: 'onerror' } },
      ],
    }
    yield {
      code: dedent`
        declare const channel: MessageChannel
        channel.port1.onmessage = function (e) {}
      `,
      output: dedent`
        declare const channel: MessageChannel
        channel.port1.addEventListener("message", function (e) {})
      `,
      errors: [{ messageId: 'instead', data: { replacement: 'add', methodName: 'onmessage' } }],
    }
    yield {
      code: dedent`
        const element = document.querySelector('...')
        element?.onclick = handleClick
        element?.['onclick'] = handleClick
      `,
      output: dedent`
        const element = document.querySelector('...')
        element?.addEventListener("click", handleClick)
        element?.addEventListener("click", handleClick)
      `,
      errors: [
        { messageId: 'instead', data: { replacement: 'add', methodName: 'onclick' } },
        { messageId: 'instead', data: { replacement: 'add', methodName: 'onclick' } },
      ],
    }
    yield {
      code: 'window.onclick = handleClick',
      output: 'window.addEventListener("click", handleClick)',
      errors: [{ messageId: 'instead', data: { replacement: 'add', methodName: 'onclick' } }],
    }
    yield {
      code: 'document.onclick = handleClick',
      output: 'document.addEventListener("click", handleClick)',
      errors: [{ messageId: 'instead', data: { replacement: 'add', methodName: 'onclick' } }],
    }
    yield {
      code: dedent`
        window.removeEventListener('click', fn.bind(window))
        window.removeEventListener('click', () => {})
      `,
      errors: [{ messageId: 'invalid-bound' }, { messageId: 'invalid-bound' }],
    }
  },
})

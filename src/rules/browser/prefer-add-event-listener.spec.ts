import dedent from 'ts-dedent'
import { runTest } from '../../spec'
import module from './prefer-add-event-listener'

runTest({
  module,
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
        { messageId: 'prefer', data: { replacement: 'add', methodName: 'onload' } },
        { messageId: 'prefer', data: { replacement: 'add', methodName: 'onerror' } },
        { messageId: 'prefer', data: { replacement: 'remove', methodName: 'onerror' } },
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
      errors: [{ messageId: 'prefer', data: { replacement: 'add', methodName: 'onmessage' } }],
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
        { messageId: 'prefer', data: { replacement: 'add', methodName: 'onclick' } },
        { messageId: 'prefer', data: { replacement: 'add', methodName: 'onclick' } },
      ],
    }
  },
})

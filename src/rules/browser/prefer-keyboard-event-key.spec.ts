import { runTest } from '../../spec'
import module from './prefer-keyboard-event-key'

runTest({
  module,
  *invalid(cast) {
    yield cast({
      code: 'declare const ev: KeyboardEvent; ev.keyCode === 8',
      output: 'declare const ev: KeyboardEvent; ev.key === "Backspace"',
      errors: [{ messageId: 'instead', data: { name: 'keyCode' } }],
    })
    yield cast({
      code: 'document.addEventListener("keydown", (event) => { event.which === 8 })',
      output: 'document.addEventListener("keydown", (event) => { event.key === "Backspace" })',
      errors: [{ messageId: 'instead', data: { name: 'which' } }],
    })
    yield cast({
      code: 'document.addEventListener("keydown", ({ which }) => {})',
      errors: [{ messageId: 'instead', data: { name: 'which' } }],
    })
    yield cast({
      code: 'document.addEventListener("keydown", (event) => { const { which } = event })',
      errors: [{ messageId: 'instead', data: { name: 'which' } }],
    })
  },
})

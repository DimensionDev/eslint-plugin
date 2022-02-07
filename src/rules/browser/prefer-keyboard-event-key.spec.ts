import { runTest } from '../../spec'
import module from './prefer-keyboard-event-key'

// cspell:ignore keydown
runTest({
  module,
  *invalid(cast) {
    yield cast({
      code: 'declare const ev: KeyboardEvent; ev.keyCode === 8',
      output: 'declare const ev: KeyboardEvent; ev.key === "Backspace"',
      errors: [{ messageId: 'instead', data: { name: 'keyCode' } }],
    })
    yield cast({
      code: 'document.addEventListener("keydown", (event) => { 8 === event.which })',
      output: 'document.addEventListener("keydown", (event) => { "Backspace" === event.key })',
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

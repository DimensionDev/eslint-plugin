import { dedent } from 'ts-dedent'
import { runTest } from '../../spec.js'
import module from './prefer-query-selector.js'

runTest({
  module,
  *invalid(cast) {
    yield cast({
      code: 'window.getElementById("...")',
      errors: [{ messageId: 'getElementById' }],
    })
    yield cast({
      code: 'document.getElementById("...")',
      errors: [{ messageId: 'getElementById' }],
    })
    yield cast({
      code: dedent`
        declare const element: HTMLElement | null
        element?.getElementById('...')
      `,
      errors: [{ messageId: 'getElementById' }],
    })
  },
})

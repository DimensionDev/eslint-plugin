import dedent from 'ts-dedent'
import { runTest } from '../../spec'
import module from './prefer-query-selector'

runTest({
  module,
  *invalid(cast) {
    yield cast({
      code: dedent`
        declare const element: HTMLElement | null
        element?.getElementById('...')
      `,
      errors: [{ messageId: 'getElementById' }],
    })
  },
})

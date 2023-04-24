import { dedent } from 'ts-dedent'
import { runTest } from '../../spec.js'
import module from './no-implicit-sort.js'

runTest({
  module,
  *valid() {
    yield dedent`
      declare const elements: string[]
      elements.sort((a, b) => a - b)
    `
    yield dedent`
      declare const elements: string[]
      elements.sort(compareFn)
    `
    yield dedent`
      declare const elements: Array<string>
      elements.sort(compareFn)
    `
  },
  *invalid() {
    yield {
      code: dedent`
        declare const elements: string[]
        elements.sort()
      `,
      errors: [{ messageId: 'invalid' }],
    }
  },
})

import { runTest } from '../spec'
import module from './prefer-default-export'

runTest({
  module,
  *valid() {
    yield { code: 'export default 1; export const example = 1;', options: ['at-top'] } as const
    yield { code: 'export const example = 1; export default 1;', options: ['at-bottom'] } as const
  },
  *invalid() {
    yield {
      code: 'export default 1; export const example = 1;',
      options: ['at-bottom'],
      errors: [{ messageId: 'at-bottom' }],
    } as const
    yield {
      code: 'export const example = 1; export default 1;',
      options: ['at-top'],
      errors: [{ messageId: 'at-top' }],
    } as const
  },
})

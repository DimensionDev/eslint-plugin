import { runTest } from '../spec.js'
import module from './prefer-default-export.js'

runTest({
  module,
  *valid(cast) {
    yield cast({ code: 'export default 1; export const example = 1;', options: ['at-top'] })
    yield cast({ code: 'export const example = 1; export default 1;', options: ['at-bottom'] })
  },
  *invalid(cast) {
    yield cast({
      code: 'export default 1; export const example = 1;',
      options: ['at-bottom'],
      errors: [{ messageId: 'at-bottom' }],
    })
    yield cast({
      code: 'export const example = 1; export default 1;',
      options: ['at-top'],
      errors: [{ messageId: 'at-top' }],
    })
  },
})

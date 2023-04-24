import { runTest } from '../../spec.js'
import module from './no-logical.js'

runTest({
  module,
  *valid(cast) {
    yield cast({ code: '<a href />', options: [0] })
    yield cast({ code: '<a href={1} />', options: [3] })
    yield '<a>{1 || 2}</a>'
  },
  *invalid() {
    yield { code: '<a href={1 ? 2 : 3} />', errors: [{ messageId: 'invalid' }] }
    yield { code: '<a href={1 || 2 || 3} />', errors: [{ messageId: 'invalid' }] }
    yield { code: '<a>{1 || 2 || 3}</a>', errors: [{ messageId: 'invalid' }] }
  },
})

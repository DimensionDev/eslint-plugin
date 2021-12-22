import { runTest } from '../spec'
import module from './no-jsx-logical'

runTest({
  module,
  *valid() {
    yield { code: '<a href />', options: [0] } as const
    yield { code: '<a href={1} />', options: [3] } as const
    yield '<a>{1 || 2}</a>'
  },
  *invalid() {
    yield { code: '<a href={1 ? 2 : 3} />', errors: [{ messageId: 'invalid' }] }
    yield { code: '<a href={1 || 2 || 3} />', errors: [{ messageId: 'invalid' }] }
    yield { code: '<a>{1 || 2 || 3}</a>', errors: [{ messageId: 'invalid' }] }
  },
})

import { runTest } from '../../spec'
import module from './prefer-location-assign'

runTest({
  module,
  *invalid(cast) {
    yield cast({
      code: "window.location = ''",
      output: "window.location.assign('')",
      errors: [{ messageId: 'instead' }],
    })
    yield cast({
      code: "window.location.href = ''",
      output: "window.location.assign('')",
      errors: [{ messageId: 'instead', data: { name: 'href' } }],
    })
    yield cast({
      code: 'window.location.port = 8080',
      errors: [{ messageId: 'instead', data: { name: 'port' } }],
    })
  },
})

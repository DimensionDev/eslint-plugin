import { createRule } from '../rule'

export default createRule({
  name: 'no-for-in',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow use for-in',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Disallow use for-in',
    },
  },
  create(context) {
    return {
      ForInStatement(node) {
        context.report({ node, messageId: 'invalid' })
      },
    }
  },
})

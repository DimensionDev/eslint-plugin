import { createRule } from '../rule.js'

export default createRule({
  name: 'no-for-in',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow use for-in',
      recommended: 'stylistic',
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

import { createRule } from '../../rule.js'

export default createRule({
  name: 'jsx/no-set-html',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow use `dangerouslySetInnerHTML` jsx attribute',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      invalid: 'Disallow use `dangerouslySetInnerHTML` jsx attribute',
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name !== 'dangerouslySetInnerHTML') return
        context.report({
          node,
          messageId: 'invalid',
        })
      },
    }
  },
})

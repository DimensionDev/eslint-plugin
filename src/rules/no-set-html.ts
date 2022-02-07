import { isIdentifierName, isMemberExpression } from '../node'
import { createRule } from '../rule'

export default createRule({
  name: 'no-set-html',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow use `.{inner,outer}HTML`',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Disallow use `.{{property}}` inject HTML',
    },
  },
  create(context) {
    return {
      AssignmentExpression(node) {
        if (!isMemberExpression(node.left)) return
        if (!isIdentifierName(node.left.property, ['innerHTML', 'outerHTML'])) return
        context.report({
          node,
          messageId: 'invalid',
          data: {
            property: node.left.property.name,
          },
        })
      },
    }
  },
})

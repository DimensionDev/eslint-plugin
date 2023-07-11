import { isIdentifierName, isMemberExpression } from '../../node.js'
import { createRule } from '../../rule.js'

export default createRule({
  name: 'browser/no-set-html',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow use `Element#{inner,outer}HTML`',
      recommended: 'recommended',
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

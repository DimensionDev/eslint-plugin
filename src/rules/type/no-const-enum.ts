import { createRule } from '../../rule'

export default createRule({
  name: 'type/no-const-enum',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Disallow use constants enumerate',
      recommended: false,
    },
    schema: [],
    messages: {
      invalid: 'Disallow use constants enumerate',
    },
  },
  create(context) {
    return {
      TSEnumDeclaration(node) {
        if (!node.const) return
        context.report({
          node,
          messageId: 'invalid',
          fix(fixer) {
            const start = node.range[0]
            const end = start + 6
            return fixer.removeRange([start, end])
          },
        })
      },
    }
  },
})

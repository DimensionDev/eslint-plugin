import { createRule } from '../../rule.js'

const PRIMITIVE_TYPES = new Set(['BigInt', 'Boolean', 'Number', 'String', 'Symbol'])

export default createRule({
  name: 'type/no-wrapper-type-reference',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Disallow wrapper type for type reference',
      recommended: 'error',
    },
    schema: [],
    messages: {
      instead: 'Use {{name}} instead',
    },
  },
  create(context) {
    return {
      TSTypeReference(node) {
        if (node.typeName.type !== 'Identifier') return
        if (!PRIMITIVE_TYPES.has(node.typeName.name)) return
        const name = node.typeName.name.toLowerCase()
        context.report({
          node,
          messageId: 'instead',
          data: { name },
          fix: (fixer) => fixer.replaceText(node.typeName, name),
        })
      },
    }
  },
})

import { createRule } from '../../rule.ts'

const PRIMITIVE_TYPES = new Set(['BigInt', 'Boolean', 'Number', 'String', 'Symbol'])

export default createRule({
  name: 'type/no-wrapper-type-reference',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Disallow wrapper type for type reference',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      instead: 'Use {{name}} instead',
    },
  },
  defaultOptions: [],
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

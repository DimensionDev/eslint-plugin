import { createRule } from '../../rule'

interface MessageOptions {
  array?: string
  object?: string
}

export default createRule({
  name: 'type/no-empty-literal',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow empty {array,object} literal',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {
          array: { type: 'string' },
          object: { type: 'object' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      invalid: 'Disallow empty {{ type }} literal',
      instead: '{{ message }}',
    },
  },
  create(context, options: MessageOptions = {}) {
    return {
      ArrayExpression(node) {
        if (node?.elements.length > 0) return
        context.report({
          node,
          messageId: options.array ? 'instead' : 'invalid',
          data: { type: 'array', message: options.array },
        })
      },
      ObjectExpression(node) {
        if (node?.properties.length > 0) return
        context.report({
          node,
          messageId: options?.object ? 'instead' : 'invalid',
          data: { type: 'object', message: options.object },
        })
      },
    }
  },
})

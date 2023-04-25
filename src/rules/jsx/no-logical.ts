import type { JSXExpressionContainer, Node } from '@typescript-eslint/types/dist/generated/ast-spec.js'
import { createRule } from '../../rule.js'

const DEFAULT_LIMIT = 2

export interface Options {
  attribute: number
  element: number
}

export default createRule({
  name: 'jsx/no-logical',
  meta: {
    type: 'problem',
    docs: {
      description: 'Limit the complexity of JSX logic expression',
      recommended: false,
    },
    schema: [
      {
        oneOf: [
          { type: 'integer', minimum: 0 },
          {
            type: 'object',
            properties: {
              attribute: { type: 'integer', minimum: 0 },
              element: { type: 'integer', minimum: 0 },
            },
            additionalProperties: false,
          },
        ],
      },
    ],
    messages: {
      invalid: 'Limit the complexity of JSX logic expression',
    },
  },
  resolveOptions(options?: number | Partial<Options>) {
    if (typeof options === 'number') {
      const limit = options ?? DEFAULT_LIMIT
      return { attribute: limit, element: limit }
    }
    const { attribute = DEFAULT_LIMIT, element = DEFAULT_LIMIT } = options ?? {}
    return { attribute, element }
  },
  create(context, options: Options) {
    function report(node: JSXExpressionContainer, limit: number) {
      // prettier-ignore
      const disallow = node.expression.type === "ConditionalExpression" ||
                getLogicalCount(node.expression) > limit;
      if (!disallow) return
      context.report({ node, messageId: 'invalid' })
    }
    return {
      JSXExpressionContainer(node) {
        const { parent } = node
        if (parent?.type === 'JSXAttribute') {
          report(node, options.attribute)
        } else if (parent?.type === 'JSXElement') {
          report(node, options.element)
        }
      },
    }
  },
})

function getLogicalCount(node: Node) {
  if (node.type !== 'LogicalExpression') return 0
  let count = 1
  while (node.type === 'LogicalExpression') {
    count += 1
    node = node.left
  }
  return count
}

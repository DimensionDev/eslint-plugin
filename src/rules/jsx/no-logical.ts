import type { TSESTree } from '@typescript-eslint/types'
import { createRule } from '../../rule.ts'

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
  defaultOptions: [DEFAULT_LIMIT] as readonly [Options | number],
  create(context, [options]: readonly [Options | number]) {
    function report(node: TSESTree.JSXExpressionContainer, limit: number) {
      const disallow = node.expression.type === 'ConditionalExpression' || getLogicalCount(node.expression) > limit
      if (!disallow) return
      context.report({ node, messageId: 'invalid' })
    }
    return {
      JSXExpressionContainer(node) {
        const { parent } = node
        if (parent?.type === 'JSXAttribute') {
          report(node, typeof options === 'number' ? options : options.attribute)
        } else if (parent?.type === 'JSXElement') {
          report(node, typeof options === 'number' ? options : options.element)
        }
      },
    }
  },
})

function getLogicalCount(node: TSESTree.Node) {
  if (node.type !== 'LogicalExpression') return 0
  let count = 1
  while (node.type === 'LogicalExpression') {
    count += 1
    node = node.left
  }
  return count
}

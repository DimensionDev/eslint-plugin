import type { TSESTree } from '@typescript-eslint/types'
import { createRule } from '../../rule.js'

export default createRule({
  name: 'type/no-force-cast-via-top-type',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallowing cast a type `T` to unrelated or incompatible type `Q` via `T as any as Q`',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      invalid: "Don't cast this expression to another type by `as {{type}} as T`",
    },
  },
  create(context) {
    return {
      TSAsExpression(node) {
        if (!isTopType(node.typeAnnotation)) return
        if (!isTypeReference(node.parent)) return
        const type = node.typeAnnotation.type === 'TSAnyKeyword' ? 'any' : 'unknown'
        context.report({ node, messageId: 'invalid', data: { type } })
      },
    }
  },
})

function isTypeReference(node: TSESTree.Node | undefined) {
  return node && node.type === 'TSAsExpression' && node.typeAnnotation.type === 'TSTypeReference'
}

function isTopType(node: TSESTree.TypeNode) {
  return node.type === 'TSAnyKeyword' || node.type === 'TSUnknownKeyword'
}

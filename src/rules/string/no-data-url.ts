import type { Node } from '@typescript-eslint/types/dist/generated/ast-spec.js'
import { createRule } from '../../rule.js'

export default createRule({
  name: 'string/no-data-url',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow use Data URL',
      recommended: 'error',
    },
    schema: [],
    messages: {
      disallow: 'Disallow use Data URL',
    },
  },
  create(context) {
    return {
      Literal(node) {
        if (isXMLNS(node.parent)) return
        if (typeof node.value !== 'string') return
        if (!isDataURL(node.value)) return
        context.report({ node, messageId: 'disallow' })
      },
      TemplateElement(node) {
        if (!isDataURL(node.value.cooked)) return
        context.report({ node, messageId: 'disallow' })
      },
    }
  },
})

function isXMLNS(node: Node | undefined) {
  if (!node) return false
  return node.type === 'JSXAttribute' && node.name.name === 'xmlns'
}

function isDataURL(input: string) {
  return input.startsWith('data:')
}

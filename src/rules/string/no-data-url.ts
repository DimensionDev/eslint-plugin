import type { TSESTree } from '@typescript-eslint/types'
import { createRule } from '../../rule.ts'

export default createRule({
  name: 'string/no-data-url',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow use Data URL',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      disallow: 'Disallow use Data URL',
    },
  },
  defaultOptions: [],
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

function isXMLNS(node: TSESTree.Node | undefined) {
  if (!node) return false
  return node.type === 'JSXAttribute' && node.name.name === 'xmlns'
}

function isDataURL(input: string) {
  return input.startsWith('data:')
}

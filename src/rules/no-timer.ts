import type { Node } from '@typescript-eslint/types/dist/ast-spec'
import { createRule } from '../rule'

const methodNames = new Set([
  'setTimeout',
  'clearTimeout',
  'setInterval',
  'clearInterval',
  'setImmediate',
  'clearImmediate',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'requestIdleCallback',
  'cancelIdleCallback',
  'nextTick',
])

export default createRule({
  name: 'no-timer',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow use timer function',
      recommended: false,
    },
    schema: [],
    messages: {
      invalid: 'Disallow use timer function',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (!detect(node.callee)) return
        context.report({ node, messageId: 'invalid' })
      },
    }
  },
})

function detect(node: Node): boolean {
  switch (node.type) {
    case 'MemberExpression':
      return detect(node.property) || detect(node.object)
    case 'Identifier':
      return methodNames.has(node.name)
    case 'Literal':
      return typeof node.value === 'string' && methodNames.has(node.value)
  }
  return false
}

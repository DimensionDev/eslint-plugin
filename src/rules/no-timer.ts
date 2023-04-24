import type { Node } from '@typescript-eslint/types/dist/generated/ast-spec.js'
import { isIdentifierName, isLiteralValue, isMemberExpression } from '../node.js'
import { createRule } from '../rule.js'

const methodNames = [
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
]

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
  if (isIdentifierName(node, methodNames)) return true
  while (isMemberExpression(node)) {
    if (isIdentifierName(node.property, methodNames)) return true
    if (isLiteralValue(node.property, methodNames)) return true
    node = node.object
  }
  return false
}

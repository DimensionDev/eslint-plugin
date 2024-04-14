import type { TSESTree } from '@typescript-eslint/types'
import { isIdentifierName, isLiteralValue } from '../node.js'
import { createRule } from '../rule.js'

// prettier-ignore
const methodNames = new Set([
  "setTimeout",
  "setInterval",
  "requestAnimationFrame",
  "requestIdleCallback",
]);

export default createRule({
  name: 'prefer-timer-id',
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce best practice with timer function',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      assign: 'Timer id should assign to an identifier or member for cleaning up, `const timer = {{name}}(...);`',
      fix: 'Assign timer id to a variable',
    },
    hasSuggestions: true,
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type !== 'Identifier') return
        const disallow =
          !methodNames.has(node.callee.name) ||
          isZeroDelay(node) ||
          (node.parent?.type === 'AssignmentExpression' && node.parent.right === node) ||
          (node.parent?.type === 'VariableDeclarator' && node.parent.init === node)
        if (disallow) return
        context.report({
          node,
          messageId: 'assign',
          data: { name: node.callee.name },
          suggest: [
            {
              messageId: 'fix',
              fix: (fixer) => fixer.insertTextBefore(node, 'const timer = '),
            },
          ],
        })
      },
    }
  },
})

function isZeroDelay(expr: TSESTree.CallExpression) {
  if (!isIdentifierName(expr.callee, 'setTimeout')) return false
  const delay = expr.arguments[1]
  return delay ? isLiteralValue(delay, 0) : true
}

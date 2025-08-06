import type { TSESTree } from '@typescript-eslint/types'
import { createRule } from '../rule.ts'

export interface Options {
  'variable'?: boolean
  'side-effect'?: boolean
}

export default createRule({
  name: 'no-top-level',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow side-effect at module top-level',
    },
    schema: [
      {
        type: 'object',
        properties: {
          'variable': { type: 'boolean' },
          'side-effect': { type: 'boolean' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      'variable': 'Unexpected {{kind}} in top-level, use const.',
      'side-effect': 'Side effects in top-level are not allowed.',
    },
  },
  defaultOptions: [{ 'variable': true, 'side-effect': true } as Options],
  create(context, [options]) {
    const handleVariable = options.variable
      ? (node: TSESTree.VariableDeclaration) => {
          if (node.kind === 'const') return
          if (!isTopLevel(node)) return
          context.report({ node, messageId: 'variable', data: { kind: node.kind } })
        }
      : undefined
    const handleSideEffect = options['side-effect']
      ? (node: TSESTree.Node) => {
          if (!isTopLevel(node)) return
          context.report({ node, messageId: 'side-effect' })
        }
      : undefined
    return {
      IfStatement: handleSideEffect,
      ForStatement: handleSideEffect,
      ForInStatement: handleSideEffect,
      ForOfStatement: handleSideEffect,
      DoWhileStatement: handleSideEffect,
      WhileStatement: handleSideEffect,
      SwitchStatement: handleSideEffect,
      ExpressionStatement: handleSideEffect,
      VariableDeclaration: handleVariable,
    }
  },
})

function isTopLevel(node: TSESTree.Node) {
  let { parent } = node
  while (parent?.type === 'BlockStatement') {
    parent = parent.parent
  }
  return parent?.type === 'Program'
}

import type { Node, VariableDeclaration } from '@typescript-eslint/types/dist/generated/ast-spec.js'
import { createRule } from '../rule.js'

interface Options {
  'variable': boolean
  'side-effect': boolean
}

export default createRule({
  name: 'no-top-level',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow side-effect at module top-level',
      recommended: false,
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
  resolveOptions(options?: Partial<Options>): Options {
    return {
      'variable': options?.variable ?? true,
      'side-effect': options?.['side-effect'] ?? true,
    }
  },
  create(context, options: Options) {
    const handleVariable = options.variable
      ? (node: VariableDeclaration) => {
          if (node.kind === 'const') return
          if (!isTopLevel(node)) return
          context.report({ node, messageId: 'variable', data: { kind: node.kind } })
        }
      : undefined
    const handleSideEffect = options['side-effect']
      ? (node: Node) => {
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

function isTopLevel(node: Node) {
  let { parent } = node
  while (parent?.type === 'BlockStatement') {
    parent = parent.parent
  }
  return parent?.type === 'Program'
}

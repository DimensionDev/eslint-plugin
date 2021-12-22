import type { Node, Program } from '@typescript-eslint/types/dist/ast-spec'
import { createRule } from '../rule'
import { findLastIndex } from '../utils'

type Location = 'at-top' | 'at-bottom'

export default createRule({
  name: 'prefer-default-export',
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce default export location at top or bottom',
      recommended: false,
    },
    schema: [{ enum: ['at-top', 'at-bottom'] }],
    messages: {
      'at-top': 'Move default export to top',
      'at-bottom': 'Move default export to bottom',
    },
  },
  resolveOptions(location?: Location) {
    return location ?? 'at-bottom'
  },
  create(context, location: Location) {
    function onProgram(program: Program) {
      const index = program.body.findIndex(isDefaultExport)
      if (index === -1) return
      const node = program.body[index]
      if (location === 'at-top' && !isTop(program, index)) {
        context.report({ node, messageId: 'at-top' })
      } else if (location === 'at-bottom' && !isBottom(program, index)) {
        context.report({ node, messageId: 'at-bottom' })
      }
    }
    return { Program: onProgram }
  },
})

function isTop(program: Program, index: number) {
  const firstIndex = program.body.findIndex(isNonDefaultExport)
  if (firstIndex === -1) return true
  return index < firstIndex
}

function isBottom(program: Program, index: number) {
  const lastIndex = findLastIndex(program.body, isNonDefaultExport)
  if (lastIndex === -1) return true
  return index > lastIndex
}

function isDefaultExport(node: Node) {
  return node.type === 'ExportDefaultDeclaration'
}

function isNonDefaultExport(node: Node) {
  return node.type === 'ExportAllDeclaration' || node.type === 'ExportNamedDeclaration'
}

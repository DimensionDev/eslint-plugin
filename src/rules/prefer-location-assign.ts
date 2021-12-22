import type { Node } from '@typescript-eslint/types/dist/ast-spec'
import type { ReportFixFunction } from '@typescript-eslint/utils/dist/ts-eslint'
import { isIdentifierName, isMemberExpression } from '../node'
import { createRule } from '../rule'

const methodNames = ['href', 'pathname', 'search', 'hash', 'origin']

export default createRule({
  name: 'prefer-location-assign',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Enforce best practice with location',
      recommended: 'error',
    },
    schema: [],
    messages: {
      enforce: "Should use 'location.assign(...)' instead",
    },
  },
  create(context) {
    return {
      AssignmentExpression(node) {
        if (!detect(node.left)) return
        const fix: ReportFixFunction = (fixer) => {
          if (!isFixable(node.right)) return null
          const source = context.getSourceCode()
          return fixer.replaceText(node, `location.assign(${source.getText(node.right)})`)
        }
        context.report({ node, messageId: 'enforce', fix })
      },
    }
  },
})

function detect(node: Node): boolean {
  switch (node.type) {
    case 'MemberExpression':
      return detect(node.object) || detect(node.property)
    case 'Identifier':
      return node.name === 'location'
  }
  return false
}

function isFixable(node: Node) {
  if (!isMemberExpression(node)) return true
  return isIdentifierName(node.property, methodNames)
}

import type { TSESTree } from '@typescript-eslint/types'
import type { ReportFixFunction, SourceCode } from '@typescript-eslint/utils/ts-eslint'
import { isIdentifier, isIdentifierName, isMemberExpression } from '../../node.js'
import { createRule } from '../../rule.js'

const fieldNames = new Set(['href', 'pathname', 'search', 'hash', 'origin'])

export default createRule({
  name: 'browser/prefer-location-assign',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Prefer `location.assign(...)` over `location.*`',
      recommended: 'stylistic',
    },
    schema: [],
    messages: {
      instead: 'Use `location.assign(...)` instead of `location.{{name}}`',
    },
  },
  create(context) {
    return {
      AssignmentExpression(node) {
        const location = getMemberProperty(node.left, 'location')
        if (!location) return
        const name = getPropertyName(location.parent)
        context.report({
          node,
          messageId: 'instead',
          data: { name },
          fix: getFixer(context.sourceCode, location, node),
        })
      },
    }
  },
})

function getMemberProperty(node: TSESTree.Node, name: string): TSESTree.Node | undefined {
  if (isIdentifierName(node, name)) return node
  while (isMemberExpression(node)) {
    if (isIdentifierName(node.property, name)) return node
    node = node.object
  }
  return
}

function getPropertyName(node: TSESTree.Node | undefined) {
  if (!isMemberExpression(node)) return
  if (!isIdentifier(node.property)) return
  return node.property.name
}

function getFixer(
  source: Readonly<SourceCode>,
  location: TSESTree.Node,
  node: TSESTree.AssignmentExpression,
): ReportFixFunction | undefined {
  const name = getPropertyName(location.parent)
  if (!fieldNames.has(name ?? 'href')) return
  return (fixer) => fixer.replaceText(node, `${source.getText(location)}.assign(${source.getText(node.right)})`)
}

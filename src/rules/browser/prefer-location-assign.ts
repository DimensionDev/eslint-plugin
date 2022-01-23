import type { AssignmentExpression, Node } from '@typescript-eslint/types/dist/ast-spec'
import type { ReportFixFunction, SourceCode } from '@typescript-eslint/utils/dist/ts-eslint'
import { isIdentifier, isIdentifierName, isMemberExpression } from '../../node'
import { createRule } from '../../rule'

const fieldNames = new Set(['href', 'pathname', 'search', 'hash', 'origin'])

export default createRule({
  name: 'browser/prefer-location-assign',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Enforce best practice with location',
      recommended: 'error',
    },
    schema: [],
    messages: {
      instead: 'Use `location.assign(...)` instead of `location.{{name}}`',
    },
  },
  create(context) {
    const source = context.getSourceCode()
    return {
      AssignmentExpression(node) {
        const location = getMemberProperty(node.left, 'location')
        if (!location) return
        const name = getPropertyName(location.parent)
        context.report({
          node,
          messageId: 'instead',
          data: { name },
          fix: getFixer(source, location, node),
        })
      },
    }
  },
})

function getMemberProperty(node: Node, name: string): Node | undefined {
  if (isIdentifierName(node, name)) return node
  while (isMemberExpression(node)) {
    if (isIdentifierName(node.property, name)) return node
    node = node.object
  }
  return
}

function getPropertyName(node: Node | undefined) {
  if (!isMemberExpression(node)) return
  if (!isIdentifier(node.property)) return
  return node.property.name
}

function getFixer(
  source: Readonly<SourceCode>,
  location: Node,
  node: AssignmentExpression
): ReportFixFunction | undefined {
  const name = getPropertyName(location.parent)
  if (!fieldNames.has(name ?? 'href')) return
  return (fixer) => fixer.replaceText(node, `${source.getText(location)}.assign(${source.getText(node.right)})`)
}

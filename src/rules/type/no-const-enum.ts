import type { Node } from '@typescript-eslint/types/dist/generated/ast-spec'
import type { Scope } from '@typescript-eslint/utils/dist/ts-eslint'
import { closest } from '../../node'
import { createRule } from '../../rule'

export default createRule({
  name: 'type/no-const-enum',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Disallow use constants enumerate',
      recommended: false,
    },
    schema: [],
    messages: {
      invalid: 'Disallow use constants enumerate',
    },
  },
  create(context) {
    return {
      TSEnumDeclaration(node) {
        if (!node.const) return
        if (!isExported(context.getDeclaredVariables(node))) return
        context.report({
          node,
          messageId: 'invalid',
          fix(fixer) {
            const start = node.range[0]
            const end = start + 6
            return fixer.removeRange([start, end])
          },
        })
      },
    }
  },
})

function isExported(variables: readonly Scope.Variable[]) {
  const definitions = variables.flatMap((variable) => variable.defs)
  const references = variables.flatMap((variable) => variable.references)
  return (
    definitions.every((definition) => closest(definition.node, isExportNode)) ||
    (references.length > 0 && references.every((reference) => closest(reference.identifier, isExportNode)))
  )
}

function isExportNode(node: Node) {
  return node.type.startsWith('Export') || node.type.startsWith('TSExport') || node.type.startsWith('TSNamespaceExport')
}

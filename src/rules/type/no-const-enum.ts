import type { Node } from '@typescript-eslint/types/dist/generated/ast-spec.js'
import type { Scope } from '@typescript-eslint/utils/dist/ts-eslint'
import { createRule } from '../../rule.js'

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
    definitions.every((definition) => isExportNode(definition.node.parent)) ||
    (references.length > 0 && references.every((reference) => isExportNode(reference.identifier.parent)))
  )
}

function isExportNode(node: Node | undefined) {
  if (!node) return false
  return node.type === 'ExportSpecifier' || node.type === 'ExportNamedDeclaration'
}

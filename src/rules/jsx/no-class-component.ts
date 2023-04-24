import type { ClassBody } from '@typescript-eslint/types/dist/generated/ast-spec.js'
import type { Scope } from '@typescript-eslint/utils/dist/ts-eslint'
import { isIdentifier, isMemberExpression } from '../../node.js'
import { createRule } from '../../rule.js'

const CLASS_NAMES = new Set(['PureComponent', 'Component'])
const EXEMPT_FIELDS = new Set(['getDerivedStateFromError'])

export default createRule({
  name: 'jsx/no-class-component',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow React Class Component',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Disallow React Class Component',
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value !== 'react') return
        const references = node.specifiers
          .flatMap(context.getDeclaredVariables)
          .flatMap((variable) => variable.references)
          .filter(isReactComponentReference)
        for (const reference of references) {
          context.report({
            node: reference.from.block,
            messageId: 'invalid',
          })
        }
      },
    }
  },
})

function isReactComponentReference({ isValueReference, identifier, resolved, from }: Scope.Reference): boolean {
  if (!isValueReference || from.type !== 'class') return false
  if (!isDefinitionGood(resolved)) return false
  if (isExempt(from.block.body)) return false
  if (CLASS_NAMES.has(identifier.name)) return true
  return (
    isMemberExpression(identifier.parent) &&
    isIdentifier(identifier.parent.property) &&
    CLASS_NAMES.has(identifier.parent.property.name)
  )
}

function isExempt({ body }: ClassBody): boolean {
  // prettier-ignore
  return body.some((element) => ("key" in element &&
        element.static &&
        element.key.type === "Identifier" &&
        EXEMPT_FIELDS.has(element.key.name)));
}

function isDefinitionGood(variable: Scope.Variable | null) {
  return variable?.defs.every(({ node }) => {
    if (node.type === 'ImportDefaultSpecifier') return true
    if (node.type === 'ImportSpecifier') return CLASS_NAMES.has(node.imported.name)
    return false
  })
}

import type ts from 'typescript'
import { isIdentifier, isMemberExpression } from '../node'
import { createRule, getParserServices } from '../rule'

const ALLOWED_METHOD_NAMES = new Set([
  'getTime',
  'getTimezoneOffset',
  'toJSON',
  'toString',
  'toISOString',
  'toUTCString',
  'toGMTString',
  'toLocaleString',
  'toLocaleDateString',
  'toLocaleTimeString',
  'valueOf',
])

export default createRule({
  name: 'no-unsafe-date',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow use unsafe Date methods',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      disallow: 'Disallow use Date#{{name}}',
    },
  },
  create(context) {
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    return {
      CallExpression(node) {
        if (!isMemberExpression(node.callee)) return
        const { object, property } = node.callee
        if (!isIdentifier(property)) return
        if (ALLOWED_METHOD_NAMES.has(property.name)) return
        if (!isDateConstructor(typeChecker, esTreeNodeToTSNodeMap.get(object))) return
        context.report({
          node: node,
          messageId: 'disallow',
          data: { name: property.name },
        })
      },
    }
  },
})

function isDateConstructor(checker: ts.TypeChecker, node: ts.Node): boolean {
  const symbol = checker.getTypeAtLocation(node).getSymbol()
  if (!symbol?.valueDeclaration) return false
  const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)
  return checker.typeToString(type) === 'DateConstructor'
}

import type ts from 'typescript'
import { isIdentifierName, isLiteralValue } from '../../node'
import { createRule, getParserServices } from '../../rule'

export default createRule({
  name: 'string/no-unneeded-to-string',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Disallow `.toString()` when simpler alternatives exist',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      invalid: 'Disallow use `.toString()` in string',
    },
  },
  create(context) {
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    return {
      CallExpression(node) {
        if (node.callee.type !== 'MemberExpression') return
        const { object, property } = node.callee
        if (!isIdentifierName(property, 'toString') && !isLiteralValue(property, 'toString')) return
        if (!isStringPrimitive(typeChecker, esTreeNodeToTSNodeMap.get(object))) return
        context.report({
          node: property,
          messageId: 'invalid',
          fix(fixer) {
            const source = context.getSourceCode()
            return fixer.replaceText(node, source.getText(object))
          },
        })
      },
    }
  },
})

function isStringPrimitive(checker: ts.TypeChecker, node: ts.Node) {
  const type = checker.getTypeAtLocation(node)
  if (type.isStringLiteral()) return true
  if (checker.typeToString(type) === 'string') return true
  const symbol = type.getSymbol()
  return symbol && checker.symbolToString(symbol) === 'String'
}

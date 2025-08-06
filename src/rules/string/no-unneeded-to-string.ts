import type ts from 'typescript'
import { isIdentifierName, isLiteralValue } from '../../node.ts'
import { createRule, ensureParserWithTypeInformation } from '../../rule.ts'

export default createRule({
  name: 'string/no-unneeded-to-string',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Disallow `String#toString()` when simpler alternatives exist',
      recommended: 'stylistic',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      invalid: 'Disallow use `.toString()` in string',
    },
  },
  defaultOptions: [],
  create(context) {
    ensureParserWithTypeInformation(context.sourceCode.parserServices)
    const { program, esTreeNodeToTSNodeMap } = context.sourceCode.parserServices
    const typeChecker = program.getTypeChecker()
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
            return fixer.replaceText(node, context.sourceCode.getText(object))
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

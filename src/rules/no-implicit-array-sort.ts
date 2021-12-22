import type ts from 'typescript'
import { isIdentifierName, isMemberExpression } from '../node'
import { createRule, getParserServices } from '../rule'

export default createRule({
  name: 'no-implicit-array-sort',
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce Array#sort provide comparator function',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      invalid: 'Please provide sort function',
    },
  },
  create(context) {
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    return {
      CallExpression(node) {
        if (!isMemberExpression(node.callee)) return
        if (!isIdentifierName(node.callee.property, 'sort')) return
        if (node.arguments.length > 0) return
        if (!isArrayType(typeChecker, esTreeNodeToTSNodeMap.get(node.callee.object))) return
        context.report({ node: node.callee.property, messageId: 'invalid' })
      },
    }
  },
})

function isArrayType(checker: ts.TypeChecker, node: ts.Node) {
  const symbol = checker.getTypeAtLocation(node).getSymbol()
  if (!symbol) return false
  return checker.symbolToString(symbol) === 'Array'
}

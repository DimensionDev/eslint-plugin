import { isIdentifierName, isMemberExpression } from '../node'
import { createRule, getParserServices } from '../rule'
import { isConstructor } from '../type-checker'

export default createRule({
  name: 'no-implicit-array-sort',
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce `Array#sort` provide comparator function',
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
        const { property, object } = node.callee
        if (!isIdentifierName(property, 'sort')) return
        if (node.arguments.length > 0) return
        if (!isConstructor(typeChecker, esTreeNodeToTSNodeMap.get(object), 'ArrayConstructor')) return
        context.report({ node: property, messageId: 'invalid' })
      },
    }
  },
})

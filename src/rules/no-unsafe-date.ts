import { isIdentifier, isMemberExpression } from '../node.js'
import { createRule, ensureParserWithTypeInformation } from '../rule.js'
import { isConstructor } from '../type-checker.js'

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
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      disallow: 'Disallow use Date#{{name}}',
    },
  },
  create(context) {
    ensureParserWithTypeInformation(context.parserServices)
    const { program, esTreeNodeToTSNodeMap } = context.parserServices
    const typeChecker = program.getTypeChecker()
    return {
      CallExpression(node) {
        if (!isMemberExpression(node.callee)) return
        const { object, property } = node.callee
        if (!isIdentifier(property)) return
        if (ALLOWED_METHOD_NAMES.has(property.name)) return
        if (!isConstructor(typeChecker, esTreeNodeToTSNodeMap.get(object), 'DateConstructor')) return
        context.report({
          node: node,
          messageId: 'disallow',
          data: { name: property.name },
        })
      },
    }
  },
})

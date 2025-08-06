import { isIdentifier, isMemberExpression } from '../node.ts'
import { createRule, ensureParserWithTypeInformation } from '../rule.ts'
import { isConstructor } from '../type-checker.ts'

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
  defaultOptions: [],
  create(context) {
    ensureParserWithTypeInformation(context.sourceCode.parserServices)
    const { program, esTreeNodeToTSNodeMap } = context.sourceCode.parserServices
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

import type { Node } from '@typescript-eslint/types/dist/generated/ast-spec.js'
import { createRule, getParserServices } from '../rule.js'
import { isConstructor } from '../type-checker.js'

export default createRule({
  name: 'no-default-error',
  meta: {
    type: 'problem',
    docs: {
      description: 'Restrict the usage of default (unextended) error',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      invalid: 'Default error object should not be used in this project',
    },
  },
  create(context) {
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    function report(node: Node) {
      if (!isConstructor(typeChecker, esTreeNodeToTSNodeMap.get(node), 'ErrorConstructor')) return
      context.report({ node, messageId: 'invalid' })
    }
    return {
      ThrowStatement(node) {
        if (!node.argument) return
        report(node.argument)
      },
      NewExpression: report,
      CallExpression: report,
    }
  },
})

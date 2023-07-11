import type { TSESTree } from '@typescript-eslint/types'
import { createRule, ensureParserWithTypeInformation } from '../rule.js'
import { isConstructor } from '../type-checker.js'

export default createRule({
  name: 'no-default-error',
  meta: {
    type: 'problem',
    docs: {
      description: 'Restrict the usage of default (unextended) error',
      recommended: 'strict',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      invalid: 'Default error object should not be used in this project',
    },
  },
  create(context) {
    ensureParserWithTypeInformation(context.parserServices)
    const {esTreeNodeToTSNodeMap, program} = context.parserServices
    const typeChecker = program.getTypeChecker()
    function report(node: TSESTree.Node) {
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

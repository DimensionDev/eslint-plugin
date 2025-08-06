import type { TSESTree } from '@typescript-eslint/types'
import { createRule, ensureParserWithTypeInformation } from '../rule.ts'
import { isConstructor } from '../type-checker.ts'

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
  defaultOptions: [],
  create(context) {
    ensureParserWithTypeInformation(context.sourceCode.parserServices)
    const { esTreeNodeToTSNodeMap, program } = context.sourceCode.parserServices
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

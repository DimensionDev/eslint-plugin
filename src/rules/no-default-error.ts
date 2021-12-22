import type ts from 'typescript'
import type { Node } from '@typescript-eslint/types/dist/ast-spec'
import { createRule, getParserServices } from '../rule'

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
      // TODO:
      //   promise.catch(() => new Error())
      //   promise.then(resolver, () => new Error())
      //   Promise.reject(new Error())
      if (!isErrorConstructor(typeChecker, esTreeNodeToTSNodeMap.get(node))) return
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

function isErrorConstructor(checker: ts.TypeChecker, node: ts.Node): boolean {
  const symbol = checker.getTypeAtLocation(node).getSymbol()
  if (!symbol?.valueDeclaration) return false
  const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)
  return checker.typeToString(type) === 'ErrorConstructor'
}

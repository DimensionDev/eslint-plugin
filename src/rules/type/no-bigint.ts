import type ts from 'typescript'
import type { CallExpression, NewExpression, Node } from '@typescript-eslint/types/dist/generated/ast-spec'
import { isIdentifierName, isMemberExpression } from '../../node'
import { createRule, getParserServices } from '../../rule'

const symbolNames = [
  'BigInt',
  'BigIntConstructor',
  'BigInt64Array',
  'BigInt64ArrayConstructor',
  'BigUint64Array',
  'BigUint64ArrayConstructor',
]

export default createRule({
  name: 'type/no-bigint',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow use BigInt',
      recommended: false,
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      invalid: 'Disallow use BigInt',
    },
  },
  create(context) {
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    function report(node: Node) {
      if (!isBigIntPrimitive(typeChecker, esTreeNodeToTSNodeMap.get(node))) return
      context.report({ node, messageId: 'invalid' })
    }
    return {
      Literal(node) {
        if (!Reflect.has(node, 'bigint')) return
        context.report({ node, messageId: 'invalid' })
      },
      NewExpression(node) {
        if (!isBigInt(node)) return
        report(node)
      },
      CallExpression(node) {
        if (!isBigInt(node)) return
        report(node)
      },
    }
  },
})

function isBigInt({ callee }: NewExpression | CallExpression) {
  if (isIdentifierName(callee, symbolNames)) return true
  return isMemberExpression(callee) && isIdentifierName(callee.property, symbolNames)
}

function isBigIntPrimitive(checker: ts.TypeChecker, node: ts.Node) {
  const type = checker.getTypeAtLocation(node)
  if (checker.typeToString(type) === 'bigint') return true
  const symbol = type.getSymbol()
  return symbol && symbolNames.includes(checker.symbolToString(symbol))
}

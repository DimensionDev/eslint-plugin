import type { MemberExpression } from '@typescript-eslint/types/dist/ast-spec'
import type { ReportFixFunction } from '@typescript-eslint/utils/dist/ts-eslint'
import type ts from 'typescript'
import { isIdentifierName, isNumberLiteral } from '../../node'
import { createRule, getParserServices } from '../../rule'
import EventKeys from '../../shared/event-keys.json'
import { quote } from '../../utils'

const fieldNames = ['keyCode', 'charCode', 'which']

export default createRule({
  name: 'browser/prefer-keyboard-event-key',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Prefer `KeyboardEvent#key` over `KeyboardEvent#{keyCode,charCode,which}`',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      instead: 'Use `.key` instead of `.{{name}}`',
    },
  },
  create(context) {
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    return {
      MemberExpression(node) {
        if (!isIdentifierName(node.property, fieldNames)) return
        if (!isKeyboardEvent(typeChecker, esTreeNodeToTSNodeMap.get(node.object))) return
        context.report({
          node,
          messageId: 'instead',
          data: { name: node.property.name },
          fix: getFixer(node),
        })
      },
      Property(node) {
        if (!isIdentifierName(node.key, fieldNames) || !node.parent) return
        if (!isKeyboardEvent(typeChecker, esTreeNodeToTSNodeMap.get(node.parent))) return
        context.report({
          node,
          messageId: 'instead',
          data: { name: node.key.name },
        })
      },
    }
  },
})

function getFixer(node: MemberExpression): ReportFixFunction | undefined {
  if (node.parent?.type !== 'BinaryExpression') return
  const { left, operator, right } = node.parent
  if (!(operator === '==' || operator === '===')) return
  return function* (fixer) {
    yield fixer.replaceText(node.property, 'key')
    if (isNumberLiteral(right)) {
      yield fixer.replaceText(right, quote(getKey(right.value)))
    } else if (isNumberLiteral(left)) {
      yield fixer.replaceText(left, quote(getKey(left.value)))
    }
  }
}

function getKey(point: number) {
  return EventKeys[point] ?? String.fromCodePoint(point)
}

function isKeyboardEvent(checker: ts.TypeChecker, node: ts.Node) {
  const type = checker.getTypeAtLocation(node)
  const types = type.isUnionOrIntersection() ? type.types : [type]
  const allTypes = types.flatMap((t) => [t, ...(t.getBaseTypes() ?? [])])
  return allTypes.some((t) => {
    const symbol = t.getSymbol()
    return symbol && checker.symbolToString(symbol) === 'KeyboardEvent'
  })
}

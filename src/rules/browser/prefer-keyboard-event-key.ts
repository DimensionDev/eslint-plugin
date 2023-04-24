import type { MemberExpression } from '@typescript-eslint/types/dist/generated/ast-spec.js'
import type { ReportFixFunction } from '@typescript-eslint/utils/dist/ts-eslint'
import { isIdentifierName, isNumberLiteral } from '../../node.js'
import { createRule, getParserServices } from '../../rule.js'
import { isKeyboardEvent } from '../../type-checker.js'
import { quote } from '../../utils.js'

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
    replacedBy: ['unicorn/prefer-keyboard-event-key'],
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
  if (point > 110 && point < 124) return `F${point - 111}`
  return eventKeys.get(point) ?? String.fromCodePoint(point)
}

// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/c193e1e/rules/shared/event-keys.js
// https://github.com/facebook/react/blob/b87aabd/packages/react-dom/src/events/getEventKey.js#L36
// Only meta characters which can't be deciphered from `String.fromCharCode(...)`
const eventKeys = new Map([
  [8, 'Backspace'],
  [9, 'Tab'],
  [12, 'Clear'],
  [13, 'Enter'],
  [16, 'Shift'],
  [17, 'Control'],
  [18, 'Alt'],
  [19, 'Pause'],
  [20, 'CapsLock'],
  [27, 'Escape'],
  [33, 'PageUp'],
  [34, 'PageDown'],
  [35, 'End'],
  [36, 'Home'],
  [37, 'ArrowLeft'],
  [38, 'ArrowUp'],
  [39, 'ArrowRight'],
  [40, 'ArrowDown'],
  [45, 'Insert'],
  [46, 'Delete'],
  [144, 'NumLock'],
  [145, 'ScrollLock'],
  [186, ';'],
  [187, '='],
  [188, ','],
  [189, '-'],
  [190, '.'],
  [191, '/'],
  [219, '['],
  [220, '\\'],
  [221, ']'],
  [222, "'"],
  [224, 'Meta'],
])

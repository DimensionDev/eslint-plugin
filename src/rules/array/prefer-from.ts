import { isIdentifierName } from '../../node.ts'
import { createRule } from '../../rule.ts'

const types = [
  'Array',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Uint16Array',
  'Uint32Array',
  'Float32Array',
  'Float64Array',
  'BigInt64Array',
  'BigUint64Array',
]

export default createRule({
  name: 'array/prefer-from',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Prefer `Array.from(...)` over `new Array(...)`',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      instead: 'Use`{{type}}.from(...)` instead of `new {{type}}(...)`',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      NewExpression(node) {
        if (!isIdentifierName(node.callee, types)) return
        if (node.arguments.length !== 1) return
        const arrayType = node.callee.name
        context.report({
          node,
          messageId: 'instead',
          data: { type: arrayType },
          fix(fixer) {
            return fixer.replaceText(node, `${arrayType}.from(${context.sourceCode.getText(node.arguments[0])})`)
          },
        })
      },
    }
  },
})

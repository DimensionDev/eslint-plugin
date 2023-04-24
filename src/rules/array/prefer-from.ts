import { isIdentifierName } from '../../node.js'
import { createRule } from '../../rule.js'

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
      description: 'Prefer `new Array(...)` over `Array.from(...)`',
      recommended: 'error',
    },
    schema: [],
    messages: {
      instead: 'Use `new {{type}}(...)` instead of `{{type}}.from(...)`',
    },
  },
  create(context) {
    const source = context.getSourceCode()
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
            return fixer.replaceText(node, `${arrayType}.from(${source.getText(node.arguments[0])})`)
          },
        })
      },
    }
  },
})

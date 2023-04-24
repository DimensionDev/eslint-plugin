import { isIdentifierFunction, isIdentifierName } from '../../node.js'
import { createRule } from '../../rule.js'

export default createRule({
  name: 'array/no-unneeded-flat-map',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Disallow `Array#flatMap((x) => x)` when simpler alternatives exist',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Disallow simple `Array#flatMap()` in array',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type !== 'MemberExpression') return
        const isFlatMap = isIdentifierName(node.callee.property, 'flatMap')
        if (!isFlatMap || !isIdentifierFunction(node.arguments[0])) return
        const { property } = node.callee
        context.report({
          node,
          messageId: 'invalid',
          *fix(fixer) {
            yield fixer.replaceText(property, 'flat')
            yield* node.arguments.map((node) => fixer.remove(node))
          },
        })
      },
    }
  },
})

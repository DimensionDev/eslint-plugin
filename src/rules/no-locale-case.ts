import { isIdentifier, isMemberExpression } from '../node'
import { createRule } from '../rule'

const methods = new Set(['toLocaleUpperCase', 'toLocaleLowerCase'])

export default createRule({
  name: 'no-locale-case',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Disallow use `.toLocale{Upper,Lower}Case()`',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Disallow use .{{name}}()',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.arguments.length > 0) return
        if (!isMemberExpression(node.callee) || !isIdentifier(node.callee.property)) return
        const { property } = node.callee
        if (!methods.has(property.name)) return
        context.report({
          node,
          data: { name: property.name },
          messageId: 'invalid',
          fix(fixer) {
            return fixer.replaceText(property, property.name.replaceAll('Locale', ''))
          },
        })
      },
    }
  },
})

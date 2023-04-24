import { isIdentifier, isMemberExpression } from '../../node.js'
import { createRule } from '../../rule.js'

const RE_METHOD_NAME = /^toLocale(?<name>Upper|Lower)Case$/g

export default createRule({
  name: 'string/no-locale-case',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Disallow use `String#toLocale{Upper,Lower}Case()`',
      recommended: 'error',
    },
    schema: [],
    messages: {
      instead: 'Use `.to{{name}}Case(...)` instead of `.toLocale{{name}}Case()`',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.arguments.length > 0) return
        if (!isMemberExpression(node.callee) || !isIdentifier(node.callee.property)) return
        const { property } = node.callee
        const matched = RE_METHOD_NAME.exec(property.name)
        if (!matched) return
        context.report({
          node,
          data: { name: matched.groups?.name },
          messageId: 'instead',
          fix(fixer) {
            return fixer.replaceText(property, property.name.replaceAll('Locale', ''))
          },
        })
      },
    }
  },
})

import { createRule } from '../../rule.js'

export default createRule({
  name: 'jsx/no-unneeded-nested',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Reduce unneeded JSXFragment nested',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Reduce unneeded JSXFragment nested',
    },
  },
  create(context) {
    const source = context.getSourceCode()
    return {
      JSXFragment(node) {
        if (node.children.length !== 1) return
        const fragment = node.children[0]
        context.report({
          node,
          messageId: 'invalid',
          *fix(fixer) {
            if (fragment.type === 'JSXExpressionContainer') {
              if (fragment.expression.type === 'JSXEmptyExpression') return
              yield fixer.replaceText(node, source.getText(fragment.expression))
            } else {
              yield fixer.replaceText(node, source.getText(fragment))
            }
          },
        })
      },
    }
  },
})

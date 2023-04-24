import { createRule } from '../../rule.js'

// cspell:ignore quasis

export default createRule({
  name: 'jsx/no-template-literal',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Disallow use template-literal in JSX',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Disallow use template-literal in JSX',
    },
  },
  create(context) {
    return {
      JSXExpressionContainer(node) {
        if (node.expression.type !== 'TemplateLiteral') return
        if (node.parent?.type === 'JSXAttribute') return
        const { expression } = node
        context.report({
          node,
          messageId: 'invalid',
          fix(fixer) {
            const tokens = [...expression.expressions, ...expression.quasis]
            tokens.sort((a, b) => a.range[0] - b.range[0])
            const source = context.getSourceCode()
            const modified = tokens.map((token) => {
              if (token.type === 'TemplateElement') return token.value.cooked
              return '{' + source.getText(token) + '}'
            })
            return fixer.replaceText(node, modified.join(''))
          },
        })
      },
    }
  },
})

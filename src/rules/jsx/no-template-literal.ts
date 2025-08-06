import { createRule } from '../../rule.ts'

// cspell:ignore quasis

export default createRule({
  name: 'jsx/no-template-literal',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Disallow use template-literal in JSX',
      recommended: 'stylistic',
    },
    schema: [],
    messages: {
      invalid: 'Disallow use template-literal in JSX',
    },
  },
  defaultOptions: [],
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
            const modified = tokens.map((token) => {
              if (token.type === 'TemplateElement') return token.value.cooked
              return '{' + context.sourceCode.getText(token) + '}'
            })
            return fixer.replaceText(node, modified.join(''))
          },
        })
      },
    }
  },
})

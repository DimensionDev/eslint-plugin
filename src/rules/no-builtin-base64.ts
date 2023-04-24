import type { CallExpression } from '@typescript-eslint/types/dist/generated/ast-spec.js'
import { isIdentifier, isMemberExpression } from '../node.js'
import { createRule } from '../rule.js'
import { wrap } from '../utils.js'

export default createRule({
  name: 'no-builtin-base64',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Disallow use built-in base64 function',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Disallow use {{name}}(...)',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const name = getCalleeName(node)
        if (name !== 'atob' && name !== 'btoa') return
        context.report({
          node,
          messageId: 'invalid',
          data: { name },
          fix(fixer) {
            const source = context.getSourceCode()
            const modified = wrap(source.getText(node.arguments[0]), (input) => {
              const a = name === 'atob' ? '"base64"' : '"binary"'
              const b = name === 'btoa' ? '"base64"' : '"binary"'
              return `Buffer.from(${input}, ${a}).toString(${b})`
            })
            return fixer.replaceText(node, modified)
          },
        })
      },
    }
  },
})

function getCalleeName({ callee }: CallExpression) {
  if (isIdentifier(callee)) {
    return callee.name
  } else if (isMemberExpression(callee) && isIdentifier(callee.property)) {
    return callee.property.name
  }
  return ''
}

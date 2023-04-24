import { isMultiline } from '../../node.js'
import { createRule } from '../../rule.js'

export default createRule({
  name: 'string/no-interpolation',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow simple string interpolation',
      recommended: 'error',
    },
    schema: [],
    messages: {
      variable: 'Please extract this expression into a variable',
    },
  },
  create(context) {
    return {
      TemplateLiteral(node) {
        for (const expr of node.expressions) {
          if (!isMultiline(expr)) continue
          context.report({ node: expr, messageId: 'variable' })
        }
      },
    }
  },
})

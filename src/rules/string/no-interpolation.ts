import { isMulitline } from '../../node'
import { createRule } from '../../rule'

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
          if (!isMulitline(expr)) continue
          context.report({ node: expr, messageId: 'variable' })
        }
      },
    }
  },
})

import { isMultiline } from '../../node.ts'
import { createRule } from '../../rule.ts'

export default createRule({
  name: 'string/no-interpolation',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow simple string interpolation',
      recommended: 'stylistic',
    },
    schema: [],
    messages: {
      variable: 'Please extract this expression into a variable',
    },
  },
  defaultOptions: [],
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

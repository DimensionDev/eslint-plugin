import type { Property, TemplateLiteral } from '@typescript-eslint/types/dist/ast-spec'
import type { ReportFixFunction } from '@typescript-eslint/utils/dist/ts-eslint'
import { closest, isMulitline } from '../node'
import { createRule } from '../rule'

export default createRule({
  name: 'no-simple-template-literal',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Disallow simple template-literal',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Disallow simple template-literal',
    },
  },
  create(context) {
    const handle = (node: TemplateLiteral) => {
      let fixer: ReportFixFunction | undefined
      if (isNoTemplateExpression(node)) {
        fixer = (fixer) => {
          const source = context.getSourceCode()
          const key = JSON.stringify(node.quasis[0].value.cooked)
          const property = closest<Property>(node, 'Property')
          return property?.key === node
            ? fixer.replaceText(property, `${key}: ${source.getText(property.value)}`)
            : fixer.replaceText(node, key)
        }
      } else if (isToString(node)) {
        fixer = (fixer) => {
          const source = context.getSourceCode()
          return fixer.replaceText(node, source.getText(node.expressions[0]))
        }
      }
      if (fixer) {
        context.report({ node, messageId: 'invalid', fix: fixer })
      }
    }
    return {
      TemplateLiteral: handle,
    }
  },
})

function isNoTemplateExpression(node: TemplateLiteral) {
  return (
    node.parent?.type !== 'TaggedTemplateExpression' &&
    node.quasis.length === 1 &&
    !isMulitline(node.quasis[0]) &&
    node.expressions.length === 0
  )
}

function isToString(node: TemplateLiteral) {
  return (
    node.quasis.length === 2 && node.quasis.every(({ value }) => value.cooked === '') && node.expressions.length === 1
  )
}

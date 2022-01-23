import type { Property, TemplateLiteral } from '@typescript-eslint/types/dist/ast-spec'
import type { ReportFixFunction, SourceCode } from '@typescript-eslint/utils/dist/ts-eslint'
import { closest, isMulitline } from '../../node'
import { createRule } from '../../rule'
import { quote } from '../../utils'

export default createRule({
  name: 'string/no-simple-template-literal',
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
    const source = context.getSourceCode()
    return {
      TemplateLiteral(node) {
        const fix = getFixer(source, node)
        if (!fix) return
        context.report({ node, messageId: 'invalid', fix })
      },
    }
  },
})

function getFixer(source: Readonly<SourceCode>, node: TemplateLiteral): ReportFixFunction | undefined {
  if (isNoTemplateExpression(node)) {
    return (fixer) => {
      const key = quote(node.quasis[0].value.cooked)
      const property = closest<Property>(node, (property) => property.type === 'Property' && property.key === node)
      return property
        ? fixer.replaceText(property, `${key}: ${source.getText(property.value)}`)
        : fixer.replaceText(node, key)
    }
  } else if (isToString(node)) {
    return (fixer) => fixer.replaceText(node, source.getText(node.expressions[0]))
  }
  return
}

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

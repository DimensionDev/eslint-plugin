import type { TSESTree } from '@typescript-eslint/types'
import type { ReportFixFunction, SourceCode } from '@typescript-eslint/utils/ts-eslint'
import { closest, isMultiline } from '../../node.js'
import { createRule } from '../../rule.js'
import { quote } from '../../utils.js'

// cspell:ignore quasis

export default createRule({
  name: 'string/no-simple-template-literal',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Disallow simple template-literal',
      recommended: 'stylistic',
    },
    schema: [],
    messages: {
      invalid: 'Disallow simple template-literal',
    },
  },
  create(context) {
    return {
      TemplateLiteral(node) {
        const fix = getFixer(context.sourceCode, node)
        if (!fix) return
        context.report({ node, messageId: 'invalid', fix })
      },
    }
  },
})

function getFixer(source: Readonly<SourceCode>, node: TSESTree.TemplateLiteral): ReportFixFunction | undefined {
  if (isNoTemplateExpression(node)) {
    return (fixer) => {
      const key = quote(node.quasis[0].value.cooked)
      const property = closest<TSESTree.Property>(
        node,
        (property) => property.type === 'Property' && property.key === node,
      )
      return property
        ? fixer.replaceText(property, `${key}: ${source.getText(property.value)}`)
        : fixer.replaceText(node, key)
    }
  } else if (isToString(node)) {
    return (fixer) => fixer.replaceText(node, source.getText(node.expressions[0]))
  }
  return
}

function isNoTemplateExpression(node: TSESTree.TemplateLiteral) {
  return (
    node.parent?.type !== 'TaggedTemplateExpression' &&
    node.quasis.length === 1 &&
    !isMultiline(node.quasis[0]) &&
    node.expressions.length === 0
  )
}

function isToString(node: TSESTree.TemplateLiteral) {
  return (
    node.quasis.length === 2 && node.quasis.every(({ value }) => value.cooked === '') && node.expressions.length === 1
  )
}

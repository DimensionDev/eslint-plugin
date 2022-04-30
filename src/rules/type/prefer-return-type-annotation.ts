import type { Node, Range, TSAsExpression, TypeNode } from '@typescript-eslint/types/dist/generated/ast-spec'
import { closest, isFunctionLike, isAwait, isIdentifierName } from '../../node'
import { createRule } from '../../rule'
import { wrap } from '../../utils'
import { getReturnExpression } from './../no-redundant-variable'

export default createRule({
  name: 'type/prefer-return-type-annotation',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Enforce Move return type annotation to function return type',
      recommended: 'error',
    },
    schema: [],
    messages: {
      'move-type': 'Move return type annotation to return type',
    },
  },
  create(context) {
    const source = context.getSourceCode()
    return {
      ReturnStatement(node) {
        const { argument } = node
        const parent = closest(node, isFunctionLike)
        if (!parent || !isAs(argument)) return
        if (isAsConstType(argument.typeAnnotation)) return
        context.report({
          node: argument.typeAnnotation,
          messageId: 'move-type',
          *fix(fixer) {
            const annotation = wrap(source.getText(argument.typeAnnotation), (annotation) => {
              if (annotation.startsWith('Promise')) return annotation
              return parent.async || isAwait(argument.expression) ? `Promise<${annotation}>` : annotation
            })
            if (!parent.returnType) {
              const offset = parent.type === 'ArrowFunctionExpression' ? 4 : 1
              const range = wrap(parent.body.range, ([start, end]): Range => [start - offset, end])
              yield fixer.insertTextBeforeRange(range, `: ${annotation}`)
            } else {
              yield fixer.insertTextAfter(parent.returnType, ` | ${annotation}`)
            }
            yield isAwait(argument.expression)
              ? fixer.replaceText(argument, source.getText(getReturnExpression(argument.expression)))
              : fixer.removeRange(wrap(argument.typeAnnotation.range, ([start, end]) => [start - 4, end]))
          },
        })
      },
    }
  },
})

function isAs(node?: Node | null): node is TSAsExpression {
  return node?.type === 'TSAsExpression'
}

function isAsConstType(node: TypeNode) {
  return node?.type === 'TSTypeReference' && isIdentifierName(node.typeName, 'const')
}

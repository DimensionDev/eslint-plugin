import type { Node, ReturnStatement, VariableDeclaration } from '@typescript-eslint/types/dist/ast-spec'
import type { ReportFixFunction, SourceCode } from '@typescript-eslint/utils/dist/ts-eslint'
import { closest, isIdentifier, isSameIdentifier } from '../node'
import { createRule } from '../rule'
import { wrap } from '../utils'

export default createRule({
  name: 'no-redundant-variable',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Disallow redundant variable',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Disallow Redundant Variable',
    },
  },
  create(context) {
    return {
      BlockStatement({ body }) {
        const exit = body.find(isReturnStatement)
        if (!exit) return
        const previous = body[body.indexOf(exit) - 1]
        if (!isRedundantVariable(previous, exit)) return
        context.report({
          node: exit,
          messageId: 'invalid',
          fix: getFixer(context.getSourceCode(), previous, exit),
        })
      },
    }
  },
})

function isReturnStatement(node: Node): node is ReturnStatement {
  return node.type === 'ReturnStatement' && isIdentifier(node.argument)
}

function isRedundantVariable(node: Node | undefined, exit: ReturnStatement): node is VariableDeclaration {
  if (!node) return false
  return (
    node.type === 'VariableDeclaration' &&
    node.declarations.length === 1 &&
    node.declarations.some(({ init, id }) => init !== null && isSameIdentifier(exit.argument, id))
  )
}

function getFixer(
  source: Readonly<SourceCode>,
  variable: VariableDeclaration,
  exit: ReturnStatement
): ReportFixFunction {
  return (fixer) => {
    const { init, id } = variable.declarations[0]
    if (!(init && id && exit.argument)) return null
    const replaced = wrap(init, (node) => {
      if (closest(node, 'TryStatement')) return node
      return node.type === 'AwaitExpression' ? node.argument : node
    })
    const modified = wrap(source.getText(replaced), (input) => {
      if (!id.typeAnnotation) return input
      let annotation = source.getText(id.typeAnnotation.typeAnnotation)
      if (init.type === 'AwaitExpression') {
        annotation = `Promise<${annotation}>`
      }
      return `(${input}) as ${annotation}`
    })
    return [fixer.remove(variable), fixer.replaceText(exit.argument, modified)]
  }
}

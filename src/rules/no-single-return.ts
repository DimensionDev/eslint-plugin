import type { Node, ReturnStatement, Statement } from '@typescript-eslint/types/dist/ast-spec'
import type { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint'
import { isFunctionLike, isIdentifier, isSameIdentifier } from '../node'
import { createRule } from '../rule'

export default createRule({
  name: 'no-single-return',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow single-return',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Disallow Single Return',
    },
  },
  create(context) {
    return {
      BlockStatement({ parent, body }) {
        if (!isFunctionLike(parent)) return
        const variable = getSingleReturnVariable(context, body)
        for (const { identifier } of variable?.references ?? []) {
          if (!identifier.parent) continue
          context.report({ node: identifier.parent, messageId: 'invalid' })
        }
      },
    }
  },
})

function getSingleReturnVariable(context: Readonly<RuleContext<string, unknown[]>>, body: Statement[]) {
  const exit = body.find(isReturnStatement)
  if (!exit) return
  const variableNode = body.find((node) => isVariableDeclaration(node, exit))
  if (!variableNode) return
  return context.getDeclaredVariables(variableNode).find(({ references }) => {
    return references.every((reference) => {
      return reference.isWriteOnly() || reference.identifier.parent === exit
    })
  })
}

function isReturnStatement(node: Node): node is ReturnStatement {
  return node.type === 'ReturnStatement' && isIdentifier(node.argument)
}

function isVariableDeclaration(node: Node, exit: ReturnStatement) {
  return (
    node.type === 'VariableDeclaration' &&
    node.kind !== 'const' &&
    node.declarations.some(({ id }) => isSameIdentifier(exit.argument, id))
  )
}

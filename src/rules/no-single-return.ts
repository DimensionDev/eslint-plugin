import type { TSESTree } from '@typescript-eslint/types'
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import { isFunctionLike, isIdentifier, isSameIdentifier } from '../node.ts'
import { createRule } from '../rule.ts'

export default createRule({
  name: 'no-single-return',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow single-return',
      recommended: 'stylistic',
    },
    schema: [],
    messages: {
      invalid: 'Disallow Single Return',
    },
  },
  defaultOptions: [],
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

function getSingleReturnVariable(context: Readonly<RuleContext<string, unknown[]>>, body: TSESTree.Statement[]) {
  const exit = body.find(isReturnStatement)
  if (!exit) return
  const variableNode = body.find((node) => isVariableDeclaration(node, exit))
  if (!variableNode) return
  return context.sourceCode.getDeclaredVariables(variableNode).find(({ references }) => {
    return references.every((reference) => {
      return reference.isWriteOnly() || reference.identifier.parent === exit
    })
  })
}

function isReturnStatement(node: TSESTree.Node): node is TSESTree.ReturnStatement {
  return node.type === 'ReturnStatement' && isIdentifier(node.argument)
}

function isVariableDeclaration(node: TSESTree.Node, exit: TSESTree.ReturnStatement) {
  return (
    node.type === 'VariableDeclaration' &&
    node.kind !== 'const' &&
    node.declarations.some(({ id }) => isSameIdentifier(exit.argument, id))
  )
}

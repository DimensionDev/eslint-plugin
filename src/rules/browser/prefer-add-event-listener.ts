import type { MemberExpression, Node } from '@typescript-eslint/types/dist/ast-spec'
import { isIdentifier } from '@typescript-eslint/utils/dist/ast-utils'
import type ts from 'typescript'
import { isMemberExpression } from '../../node'
import { createRule, getParserServices } from '../../rule'
import { quote } from '../../utils'

export default createRule({
  name: 'browser/prefer-add-event-listener',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Prefer `.{add,remove}EventListener()` over `on`-functions',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      prefer: 'Prefer `{{replacement}}EventListener` over `{{methodName}}`.',
    },
    replacedBy: ['unicorn/prefer-add-event-listener'],
  },
  create(context) {
    const source = context.getSourceCode()
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    return {
      AssignmentExpression(node) {
        const { left, right } = node
        if (!isMemberExpression(left) || left.computed) return
        const eventName = getEventMethodName(left)
        if (!eventName?.startsWith('on')) return
        if (!isEventTarget(typeChecker, esTreeNodeToTSNodeMap.get(left.object))) return
        context.report({
          node: left,
          messageId: 'prefer',
          data: {
            replacement: !isNil(right) ? 'add' : 'remove',
            methodName: eventName,
          },
          fix(fixer) {
            if (isNil(right)) return null
            const reference = source.getText(left.object)
            const method = quote(eventName.replace(/^on/, ''))
            const handle = source.getText(right)
            const modified = `${reference}.addEventListener(${method}, ${handle})`
            return fixer.replaceText(node, modified)
          },
        })
      },
    }
  },
})

function isEventTarget(checker: ts.TypeChecker, node: ts.Node) {
  const baseTypes = checker.getTypeAtLocation(node).getBaseTypes()
  return baseTypes?.some((baseType) => {
    const symbol = baseType.getSymbol()
    return symbol && checker.symbolToString(symbol) === 'EventTarget'
  })
}

function isNil(node: Node) {
  if (node.type === 'Literal') return node.raw === 'null'
  if (node.type === 'Identifier') return node.name === 'undefined'
  return false
}

function getEventMethodName(node: MemberExpression) {
  if (!isIdentifier(node.property)) return
  return node.property.name
}

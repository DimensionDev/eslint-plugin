import type { MemberExpression, Node } from '@typescript-eslint/types/dist/ast-spec'
import type ts from 'typescript'
import {
  isBindCall,
  isChainExpression,
  isFunctionLike,
  isIdentifier,
  isIdentifierName,
  isLiteral,
  isMemberExpression,
} from '../../node'
import { createRule, getParserServices } from '../../rule'
import { quote, wrap } from '../../utils'

export default createRule({
  name: 'browser/prefer-event-target',
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
      'prefer': 'Prefer `{{replacement}}EventListener` over `{{methodName}}`',
      'invalid-bound': 'The listener argument should be a function reference',
    },
    replacedBy: ['unicorn/prefer-add-event-listener', 'unicorn/no-invalid-remove-event-listener'],
  },
  create(context) {
    const source = context.getSourceCode()
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    return {
      AssignmentExpression(node) {
        if (node.operator !== '=') return
        const { left, right } = node
        const [eventName, expression] = parse(left)
        if (!eventName || !expression?.object) return
        if (!isEventTarget(typeChecker, esTreeNodeToTSNodeMap.get(expression.object))) return
        context.report({
          node: left,
          messageId: 'prefer',
          data: {
            replacement: isNil(right) ? 'remove' : 'add',
            methodName: eventName,
          },
          fix(fixer) {
            if (isNil(right)) return null
            const reference = source.getText(expression.object) + (expression.optional ? '?' : '')
            const method = quote(eventName.replace(/^on/, ''))
            const handle = source.getText(right)
            const modified = `${reference}.addEventListener(${method}, ${handle})`
            return fixer.replaceText(node, modified)
          },
        })
      },
      CallExpression(node) {
        if (!isMemberExpression(node.callee)) return
        if (!isIdentifierName(node.callee.property, 'removeEventListener')) return
        const callback = node.arguments[1]
        if (!(isBindCall(callback) || isFunctionLike(callback))) return
        context.report({ node, messageId: 'invalid-bound' })
      },
    }
  },
})

function parse(node: Node): [string | undefined, MemberExpression | undefined] {
  if (isChainExpression(node)) {
    return parse(node.expression)
  } else if (isMemberExpression(node)) {
    const name = wrap(node.property, (node) => {
      if (isIdentifier(node)) return node.name
      if (isLiteral(node) && typeof node.value === 'string') return node.value
      return
    })
    if (!name?.startsWith('on')) return [undefined, undefined]
    return [name, node]
  }
  return [undefined, undefined]
}

function isEventTarget(checker: ts.TypeChecker, node: ts.Node) {
  const type = checker.getTypeAtLocation(node)
  if (type.isUnionOrIntersection()) {
    return type.types.some((type) => type.getProperty('addEventListener'))
  }
  return type.getProperty('addEventListener') !== undefined
}

function isNil(node: Node) {
  if (node.type === 'Literal') return node.raw === 'null'
  if (node.type === 'Identifier') return node.name === 'undefined'
  return false
}

import type { MemberExpression, Node } from '@typescript-eslint/types/dist/generated/ast-spec'
import { isChainExpression, isIdentifier, isMemberExpression, isStringLiteral } from '../../node'
import { createRule, getParserServices } from '../../rule'
import { isElement } from '../../type-checker'
import { wrap } from '../../utils'

const METHOD_NAMES = <const>['getElementById', 'getElementsByClassName', 'getElementsByTagName']

export default createRule({
  name: 'browser/prefer-query-selector',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Prefer `Element#querySelector` over `Element#getElementById`',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      getElementById: 'Use `Element#querySelector` instead of `Element#getElementById`',
      getElementsByClassName: 'Use `Element#querySelectorAll` instead of `Element#getElementsByClassName`',
      getElementsByTagName: 'Use `Element#querySelectorAll` instead of `Element#getElementsByTagName`',
    },
    replacedBy: ['unicorn/prefer-query-selector'],
  },
  create(context) {
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    return {
      CallExpression(node) {
        const [methodName, expression] = parseCallee(node.callee)
        if (!methodName || !expression) return
        if (!isElement(typeChecker, esTreeNodeToTSNodeMap.get(expression.object))) return
        if (!isMethodName(methodName)) return
        context.report({ node, messageId: methodName })
      },
    }
  },
})

function isMethodName(name: string): name is typeof METHOD_NAMES[number] {
  return (METHOD_NAMES as readonly string[]).includes(name)
}

export function parseCallee(node: Node): [string | undefined, MemberExpression | undefined] {
  if (isChainExpression(node)) {
    return parseCallee(node.expression)
  } else if (isMemberExpression(node)) {
    const name = wrap(node.property, (property) => {
      if (isIdentifier(property)) return property.name
      if (isStringLiteral(property)) return property.value
      return
    })
    return [name, node]
  }
  return [undefined, undefined]
}

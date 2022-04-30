import type { StringLiteral } from '@typescript-eslint/types/dist/generated/ast-spec'
import type { ReportFixFunction } from '@typescript-eslint/utils/dist/ts-eslint'
import { isLiteralValue, isMemberExpression } from '../../node'
import { createRule, getParserServices } from '../../rule'
import { isElement } from '../../type-checker'
import { property, quote } from '../../utils'
import { parseCallee } from './prefer-query-selector'

const METHOD_NAMES = new Set(['getAttribute', 'setAttribute', 'hasAttribute', 'removeAttribute'])

export default createRule({
  name: 'browser/prefer-dataset',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Prefer `Element#dataset` over `Element#{get,set,has,remove}Attribute`',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      instead: 'Use `Element#dataset` instead of `Element#{{methodName}}`',
    },
    replacedBy: ['unicorn/prefer-dom-node-dataset'],
  },
  create(context) {
    const source = context.getSourceCode()
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    return {
      CallExpression(node) {
        const [methodName, expression] = parseCallee(node.callee)
        if (!methodName || !expression) return
        if (!METHOD_NAMES.has(methodName)) return
        if (!isLiteralValue(node.arguments[0], /^data-/)) return
        if (!isElement(typeChecker, esTreeNodeToTSNodeMap.get(expression.object))) return
        const name = getName(node.arguments[0])
        const data = { path: property(name), methodName, name }
        const fix: ReportFixFunction = (fixer) => {
          if (!isMemberExpression(node.callee)) return null
          const prefix = `${source.getText(node.callee.object)}${node.callee.optional ? '?' : ''}.dataset`
          switch (methodName) {
            case 'getAttribute':
              return fixer.replaceText(node, prefix + property(name))
            case 'setAttribute':
              return fixer.replaceText(node, `${prefix}${property(name)} = ${source.getText(node.arguments[1])}`)
            case 'hasAttribute':
              return fixer.replaceText(node, `Object.hasOwn(${prefix}, ${quote(name)})`)
            case 'removeAttribute':
              return fixer.replaceText(node, `delete ${prefix}${property(name)}`)
          }
          return null
        }
        context.report({ node, messageId: 'instead', data, fix })
      },
    }
  },
})

function getName(node: StringLiteral) {
  return node.value
    .replace(/^data-/, '')
    .toLowerCase()
    .split(/-/g)
    .map((element, index) => (index === 0 ? element : element[0].toUpperCase() + element.slice(1)))
    .join('')
}

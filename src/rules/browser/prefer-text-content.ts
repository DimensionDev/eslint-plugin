import { isIdentifierName } from '../../node.js'
import { createRule, getParserServices } from '../../rule.js'
import { isElement } from '../../type-checker.js'

export default createRule({
  name: 'browser/prefer-text-content',
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      description: 'Prefer `Element#textContent` over `Element#innerText`',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      instead: 'Use `Element#textContent` instead of `Element#innerText`',
      suggest: 'Switch to `Element#textContent`',
    },
    replacedBy: ['unicorn/prefer-dom-node-text-content'],
  },
  create(context) {
    const { typeChecker, esTreeNodeToTSNodeMap } = getParserServices(context)
    return {
      MemberExpression(node) {
        if (!isIdentifierName(node.property, 'innerText')) return
        if (!isElement(typeChecker, esTreeNodeToTSNodeMap.get(node.object))) return
        context.report({
          node: node.property,
          messageId: 'instead',
          suggest: [
            {
              messageId: 'suggest',
              fix(fixer) {
                return fixer.replaceText(node.property, 'textContent')
              },
            },
          ],
        })
      },
      Property(node) {
        if (node.parent?.type !== 'ObjectPattern') return
        if (!isIdentifierName(node.key, 'innerText')) return
        if (!isElement(typeChecker, esTreeNodeToTSNodeMap.get(node.parent))) return
        context.report({
          node,
          messageId: 'instead',
          suggest: [
            {
              messageId: 'suggest',
              fix(fixer) {
                return fixer.replaceText(node.key, `textContent${node.shorthand ? ': innerText' : ''}`)
              },
            },
          ],
        })
      },
    }
  },
})

import type { TSESTree } from '@typescript-eslint/types'
import { isIdentifierName, isLiteralValue, isMemberExpression } from '../node.ts'
import { createRule } from '../rule.ts'

export default createRule({
  name: 'prefer-fetch',
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce fetch',
      recommended: 'stylistic',
    },
    schema: [],
    messages: {
      callee: "Should use 'fetch' instead",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node) {
        const packageName = node.source.value
        const disallow = packageName === 'axios' || packageName === 'request'
        if (!disallow) return
        context.report({ node, messageId: 'callee' })
      },
      NewExpression(node) {
        const disallow = isXMLHttpRequest(node) || isActiveXObject(node)
        if (!disallow) return
        context.report({ node, messageId: 'callee' })
      },
      CallExpression(node) {
        const disallow = is$HTTP(node) || isJQuery(node) || isRequire(node, 'axios') || isRequire(node, 'request')
        if (!disallow) return
        context.report({ node, messageId: 'callee' })
      },
    }
  },
})

function isXMLHttpRequest({ callee }: TSESTree.NewExpression) {
  return isIdentifierName(callee, 'XMLHttpRequest')
}

function isActiveXObject(expr: TSESTree.NewExpression) {
  // cspell:ignore XMLHTTP
  return isIdentifierName(expr.callee, 'ActiveXObject') && isLiteralValue(expr.arguments[0], /xmlhttp/i)
}

function isRequire(node: TSESTree.CallExpression, value: string) {
  return isIdentifierName(node.callee, 'require') && isLiteralValue(node.arguments[0], value)
}

function is$HTTP({ callee }: TSESTree.CallExpression) {
  const SYMBOL = '$http'
  return isIdentifierName(callee, SYMBOL) || (isMemberExpression(callee) && isIdentifierName(callee.object, SYMBOL))
}

function isJQuery({ callee, parent }: TSESTree.CallExpression) {
  const SYMBOLS = ['$', 'jQuery']
  const methods = ['ajax', 'get', 'post', 'getJSON', 'getScript']
  return (
    (isIdentifierName(callee, SYMBOLS) && isMemberExpression(parent) && isIdentifierName(parent.property, 'load')) ||
    (isMemberExpression(callee) &&
      isIdentifierName(callee.object, SYMBOLS) &&
      isIdentifierName(callee.property, methods))
  )
}

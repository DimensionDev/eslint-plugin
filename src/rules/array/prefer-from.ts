import type { TSESTree } from '@typescript-eslint/types'
import type ts from 'typescript'
import { isIdentifierName } from '../../node.ts'
import { createRule } from '../../rule.ts'

const types = [
  'Array',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Uint16Array',
  'Uint32Array',
  'Float32Array',
  'Float64Array',
  'BigInt64Array',
  'BigUint64Array',
]

export default createRule({
  name: 'array/prefer-from',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Disallow `new Array(...)` and prefer `TypedArray.from(...)` for iterable input',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      avoid: 'Avoid `new Array(...)`; use an array literal when possible',
      instead: 'Use`{{type}}.from(...)` instead of `new {{type}}(...)`',
    },
  },
  create(context) {
    const parserServices = context.sourceCode.parserServices
    const esTreeNodeToTSNodeMap = parserServices?.esTreeNodeToTSNodeMap
    const typeChecker = parserServices?.program?.getTypeChecker()

    return {
      NewExpression(node) {
        if (!isIdentifierName(node.callee, types)) return
        if (node.callee.name === 'Array') {
          context.report({ node, messageId: 'avoid' })
          return
        }
        if (node.arguments.length !== 1) return
        if (!isKnownIterable(node.arguments[0], typeChecker, esTreeNodeToTSNodeMap)) return
        const arrayType = node.callee.name
        context.report({
          node,
          messageId: 'instead',
          data: { type: arrayType },
          fix(fixer) {
            return fixer.replaceText(node, `${arrayType}.from(${context.sourceCode.getText(node.arguments[0])})`)
          },
        })
      },
    }
  },
})

function isKnownIterable(
  node: TSESTree.Node,
  typeChecker: ts.TypeChecker | undefined,
  esTreeNodeToTSNodeMap: { get(node: TSESTree.Node): ts.Node | undefined } | undefined,
) {
  if (node.type === 'ArrayExpression') return true
  if (node.type === 'TSAsExpression' || node.type === 'TSTypeAssertion' || node.type === 'TSNonNullExpression') {
    return isKnownIterable(node.expression, typeChecker, esTreeNodeToTSNodeMap)
  }
  if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && !node.callee.computed) {
    const { object, property } = node.callee
    if (isIdentifierName(object, 'Array') && isIdentifierName(property, ['from', 'of'])) return true
    if (isIdentifierName(object, 'Object') && isIdentifierName(property, ['keys', 'values', 'entries'])) return true
  }

  const tsNode = esTreeNodeToTSNodeMap?.get(node)
  if (!typeChecker || !tsNode) return false
  const type = typeChecker.getTypeAtLocation(tsNode)
  const types = type.isUnion() ? type.types : [type]
  return types.every(
    (type) => !isStringPrimitive(typeChecker, type) && typeChecker.getPropertiesOfType(type).some(isIteratorProperty),
  )
}

function isStringPrimitive(checker: ts.TypeChecker, type: ts.Type) {
  return type.isStringLiteral() || checker.typeToString(type) === 'string'
}

function isIteratorProperty(property: ts.Symbol) {
  return String(property.escapedName).startsWith('__@iterator@')
}

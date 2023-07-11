import type { TSESTree } from '@typescript-eslint/types'
import type { Predicate } from './utils.js'

export function closest<T extends TSESTree.Node>(node: TSESTree.Node | undefined, type: string): T | undefined
export function closest<T extends TSESTree.Node>(
  node: TSESTree.Node | undefined,
  test: (node: TSESTree.Node) => node is T,
): T | undefined
export function closest<T extends TSESTree.Node>(
  node: TSESTree.Node | undefined,
  test: (node: TSESTree.Node) => boolean,
): T | undefined
export function closest(
  node: TSESTree.Node | undefined,
  test: string | ((node: TSESTree.Node) => boolean),
): TSESTree.Node | undefined {
  if (typeof test === 'string') {
    const typeName = test
    test = (node) => node.type === typeName
  }
  while (node) {
    if (test(node)) return node
    node = node.parent
  }
  return undefined
}

export function isMultiline({ loc }: TSESTree.Node) {
  if (!loc) return false
  return loc.start.line !== loc.end.line
}

export function isIdentifier(node?: TSESTree.Node | null): node is TSESTree.Identifier | TSESTree.PrivateIdentifier {
  return node?.type === 'Identifier' || node?.type === 'PrivateIdentifier'
}

export function isMemberExpression(node?: TSESTree.Node | null): node is TSESTree.MemberExpression {
  return node?.type === 'MemberExpression'
}

export function isChainExpression(node?: TSESTree.Node | null): node is TSESTree.ChainExpression {
  return node?.type === 'ChainExpression'
}

export function isCallExpression(node?: TSESTree.Node | null): node is TSESTree.CallExpression {
  return node?.type === 'CallExpression'
}

export function isBindCall(node?: TSESTree.Node | null): node is TSESTree.CallExpression {
  return isCallExpression(node) && isMemberExpression(node.callee) && isIdentifierName(node.callee.property, 'bind')
}

export function isLiteral(node?: TSESTree.Node | null): node is TSESTree.Literal {
  return node?.type === 'Literal'
}

export function isAwait(node?: TSESTree.Node | null): node is TSESTree.AwaitExpression {
  return node?.type === 'AwaitExpression'
}

export function isStringLiteral(node?: TSESTree.Node | null): node is TSESTree.StringLiteral {
  return node?.type === 'Literal' && typeof node.value === 'string'
}

export function isNumberLiteral(node?: TSESTree.Node | null): node is TSESTree.NumberLiteral {
  return node?.type === 'Literal' && typeof node.value === 'number'
}

export function isBigIntLiteral(node?: TSESTree.Node | null): node is TSESTree.BigIntLiteral {
  return node?.type === 'Literal' && Reflect.has(node, 'bigint')
}

export function isRegExpLiteral(node?: TSESTree.Node | null): node is TSESTree.RegExpLiteral {
  return node?.type === 'Literal' && Reflect.has(node, 'regex')
}

export function isIdentifierName(node: TSESTree.Node | undefined | null, name: string): node is TSESTree.Identifier
export function isIdentifierName(node: TSESTree.Node | undefined | null, names: string[]): node is TSESTree.Identifier
export function isIdentifierName(
  node: TSESTree.Node | undefined | null,
  test: Predicate<string>,
): node is TSESTree.Identifier
export function isIdentifierName(node: TSESTree.Node | undefined | null, name: unknown) {
  if (!isIdentifier(node)) return false
  if (typeof name === 'function') return name(node.name)
  if (Array.isArray(name)) return name.includes(node.name)
  return node.name === name
}

export function isLiteralValue(node: TSESTree.Node | undefined | null, value: number): node is TSESTree.NumberLiteral
export function isLiteralValue(node: TSESTree.Node | undefined | null, value: string): node is TSESTree.StringLiteral
export function isLiteralValue(
  node: TSESTree.Node | undefined | null,
  value: TSESTree.Literal['value'][],
): node is TSESTree.Literal
export function isLiteralValue(node: TSESTree.Node | undefined | null, pattern: RegExp): node is TSESTree.StringLiteral
export function isLiteralValue(node: TSESTree.Node | undefined | null, value: unknown) {
  if (node?.type !== 'Literal') return false
  if (Array.isArray(value)) return value.includes(node.value)
  if (typeof node.value === 'string' && value instanceof RegExp) return value.test(node.value)
  return node.value === value
}

export function isFunctionLike(
  node?: TSESTree.Node | null,
): node is TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration | TSESTree.FunctionExpression {
  const ALLOWED_TYPES = ['ArrowFunctionExpression', 'FunctionDeclaration', 'FunctionExpression']
  return node ? ALLOWED_TYPES.includes(node.type) : false
}

export function isIdentifierFunction(node: TSESTree.Node) {
  if (!isFunctionLike(node)) return false
  if (node.params.length !== 1) return false
  if (node.params[0].type !== 'Identifier') return false
  if (!node.body) return false
  if (isSameIdentifier(node.params[0], node.body)) return true
  return (
    node.body.type === 'BlockStatement' &&
    node.body.body.length === 1 &&
    node.body.body[0].type === 'ReturnStatement' &&
    isSameIdentifier(node.params[0], node.body.body[0].argument)
  )
}

export function isSameIdentifier(a: TSESTree.Node | undefined | null, b: TSESTree.Node | undefined | null) {
  return a?.type === 'Identifier' && b?.type === a.type && a.name === b.name
}

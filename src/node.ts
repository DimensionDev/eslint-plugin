import type {
  ArrowFunctionExpression,
  AwaitExpression,
  BigIntLiteral,
  CallExpression,
  ChainExpression,
  FunctionDeclaration,
  FunctionExpression,
  Identifier,
  Literal,
  MemberExpression,
  Node,
  NumberLiteral,
  PrivateIdentifier,
  RegExpLiteral,
  StringLiteral,
} from '@typescript-eslint/types/dist/generated/ast-spec.js'
import type { Predicate } from './utils.js'

export function closest<T extends Node>(node: Node | undefined, type: string): T | undefined
export function closest<T extends Node>(node: Node | undefined, test: (node: Node) => node is T): T | undefined
export function closest<T extends Node>(node: Node | undefined, test: (node: Node) => boolean): T | undefined
export function closest(node: Node | undefined, test: string | ((node: Node) => boolean)): Node | undefined {
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

export function isMultiline({ loc }: Node) {
  if (!loc) return false
  return loc.start.line !== loc.end.line
}

export function isIdentifier(node?: Node | null): node is Identifier | PrivateIdentifier {
  return node?.type === 'Identifier' || node?.type === 'PrivateIdentifier'
}

export function isMemberExpression(node?: Node | null): node is MemberExpression {
  return node?.type === 'MemberExpression'
}

export function isChainExpression(node?: Node | null): node is ChainExpression {
  return node?.type === 'ChainExpression'
}

export function isCallExpression(node?: Node | null): node is CallExpression {
  return node?.type === 'CallExpression'
}

export function isBindCall(node?: Node | null): node is CallExpression {
  return isCallExpression(node) && isMemberExpression(node.callee) && isIdentifierName(node.callee.property, 'bind')
}

export function isLiteral(node?: Node | null): node is Literal {
  return node?.type === 'Literal'
}

export function isAwait(node?: Node | null): node is AwaitExpression {
  return node?.type === 'AwaitExpression'
}

export function isStringLiteral(node?: Node | null): node is StringLiteral {
  return node?.type === 'Literal' && typeof node.value === 'string'
}

export function isNumberLiteral(node?: Node | null): node is NumberLiteral {
  return node?.type === 'Literal' && typeof node.value === 'number'
}

export function isBigIntLiteral(node?: Node | null): node is BigIntLiteral {
  return node?.type === 'Literal' && Reflect.has(node, 'bigint')
}

export function isRegExpLiteral(node?: Node | null): node is RegExpLiteral {
  return node?.type === 'Literal' && Reflect.has(node, 'regex')
}

export function isIdentifierName(node: Node | undefined | null, name: string): node is Identifier
export function isIdentifierName(node: Node | undefined | null, names: string[]): node is Identifier
export function isIdentifierName(node: Node | undefined | null, test: Predicate<string>): node is Identifier
export function isIdentifierName(node: Node | undefined | null, name: unknown) {
  if (!isIdentifier(node)) return false
  if (typeof name === 'function') return name(node.name)
  if (Array.isArray(name)) return name.includes(node.name)
  return node.name === name
}

export function isLiteralValue(node: Node | undefined | null, value: number): node is NumberLiteral
export function isLiteralValue(node: Node | undefined | null, value: string): node is StringLiteral
export function isLiteralValue(node: Node | undefined | null, value: Literal['value'][]): node is Literal
export function isLiteralValue(node: Node | undefined | null, pattern: RegExp): node is StringLiteral
export function isLiteralValue(node: Node | undefined | null, value: unknown) {
  if (node?.type !== 'Literal') return false
  if (Array.isArray(value)) return value.includes(node.value)
  if (typeof node.value === 'string' && value instanceof RegExp) return value.test(node.value)
  return node.value === value
}

export function isFunctionLike(
  node?: Node | null
): node is ArrowFunctionExpression | FunctionDeclaration | FunctionExpression {
  const ALLOWED_TYPES = ['ArrowFunctionExpression', 'FunctionDeclaration', 'FunctionExpression']
  return node ? ALLOWED_TYPES.includes(node.type) : false
}

export function isIdentifierFunction(node: Node) {
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

export function isSameIdentifier(a: Node | undefined | null, b: Node | undefined | null) {
  return a?.type === 'Identifier' && b?.type === a.type && a.name === b.name
}

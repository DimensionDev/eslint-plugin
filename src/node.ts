import type {
  BigIntLiteral,
  FunctionLike,
  Identifier,
  Literal,
  MemberExpression,
  Node,
  PrivateIdentifier,
  RegExpLiteral,
} from '@typescript-eslint/types/dist/ast-spec'
import type { Predicate } from './utils'

export function closest<T extends Node>(node: Node | null | undefined, type: string): T | undefined
export function closest<T extends Node>(node: Node | null | undefined, test: (node: Node) => node is T): T | undefined
export function closest<T extends Node>(node: Node | null | undefined, test: (node: Node) => boolean): T | undefined
export function closest(node: Node | null | undefined, test: string | ((node: Node) => boolean)): Node | undefined {
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

export function isMulitline({ loc }: Node) {
  if (!loc) return false
  return loc.start.line !== loc.end.line
}

export function isIdentifier(node: Node | null | undefined): node is Identifier | PrivateIdentifier {
  return node?.type === 'Identifier' || node?.type === 'PrivateIdentifier'
}

export function isMemberExpression(node: Node | null | undefined): node is MemberExpression {
  return node?.type === 'MemberExpression'
}

export function isLiteral(node: Node | null | undefined): node is Literal {
  return node?.type === 'Literal'
}

export function isBigIntLiteral(node: Node | null | undefined): node is BigIntLiteral {
  return node?.type === 'Literal' && Reflect.has(node, 'bigint')
}

export function isRegExpLiteral(node: Node | null | undefined): node is RegExpLiteral {
  return node?.type === 'Literal' && Reflect.has(node, 'regex')
}

export function isIdentifierName(node: Node, name: string): boolean
export function isIdentifierName(node: Node, names: string[]): boolean
export function isIdentifierName(node: Node, test: Predicate<string>): boolean
export function isIdentifierName(node: Node, name: unknown) {
  if (!isIdentifier(node)) return false
  if (typeof name === 'function') return name(node.name)
  if (Array.isArray(name)) return name.includes(node.name)
  return node.name === name
}

export function isLiteralValue(node: Node, value: number): boolean
export function isLiteralValue(node: Node, value: string): boolean
export function isLiteralValue(node: Node, pattern: RegExp): boolean
export function isLiteralValue(node: Node, value: unknown) {
  if (node.type !== 'Literal') return false
  if (typeof node.value === 'string' && value instanceof RegExp) return value.test(node.value)
  return node.value === value
}

export function isFunctionLike(node: Node | undefined): node is FunctionLike {
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

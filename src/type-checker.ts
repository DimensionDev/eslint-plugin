import type ts from 'typescript'

export function isElement(checker: ts.TypeChecker, node: ts.Node) {
  return isBaseType(checker, node, ['Window', 'Document', 'Element'])
}

export function isEventTarget(checker: ts.TypeChecker, node: ts.Node) {
  return isBaseType(checker, node, ['Window', 'Document', 'Element', 'EventTarget'])
}

export function isKeyboardEvent(checker: ts.TypeChecker, node: ts.Node) {
  return isBaseType(checker, node, ['KeyboardEvent'])
}

function isBaseType(checker: ts.TypeChecker, node: ts.Node, typeNames: string[]) {
  const type = checker.getTypeAtLocation(node)
  const types = type.isUnionOrIntersection() ? type.types : [type]
  const allTypes = types.flatMap((t) => [t, ...(t.getBaseTypes() ?? [])])
  return allTypes.some((t) => {
    const symbol = t.getSymbol()
    return symbol && typeNames.includes(checker.symbolToString(symbol))
  })
}

export function isConstructor(checker: ts.TypeChecker, node: ts.Node, typeName: string) {
  return getConstructorTypeName(checker, node) === typeName
}

function getConstructorTypeName(checker: ts.TypeChecker, node: ts.Node) {
  const symbol = checker.getTypeAtLocation(node).getSymbol()
  if (!symbol?.valueDeclaration) return
  const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)
  return checker.typeToString(type)
}

import type ts from 'typescript'

export function isElement(checker: ts.TypeChecker, node: ts.Node) {
  const type = checker.getTypeAtLocation(node)
  const types = type.isUnionOrIntersection() ? type.types : [type]
  const allTypes = types.flatMap((t) => [t, ...(t.getBaseTypes() ?? [])])
  return allTypes.some((baseType) => {
    const symbol = baseType.getSymbol()
    return symbol && checker.symbolToString(symbol) === 'Element'
  })
}

import type { Scope } from '@typescript-eslint/utils/ts-eslint'
import { closest } from '../../node.ts'
import { createRule } from '../../rule.ts'
import { getGlobalScope } from '../../utils.ts'

export default createRule({
  name: 'browser/no-persistent-storage',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow use browser persistent storage',
      recommended: 'strict',
    },
    schema: [],
    messages: {
      invalid: 'Disallow use browser persistent storage',
    },
  },
  defaultOptions: [],
  create(context) {
    const globalScope = getGlobalScope(context.sourceCode)
    return {
      Program() {
        if (globalScope) {
          for (const node of getStorageReferences(globalScope)) {
            context.report({ node, messageId: 'invalid' })
          }
        }
      },
    }
  },
})

function* getStorageReferences(globalScope: Scope.Scope) {
  const variableNames = ['localStorage', 'sessionStorage', 'indexedDB', 'cookieStore']
  yield* getStorageInstances(globalScope, variableNames)
  yield* getDocumentCookieReferences(globalScope) ?? []
}

function getStorageInstances(globalScope: Scope.Scope, variableNames: string[]) {
  return variableNames
    .flatMap((name) => globalScope.set.get(name)?.references ?? [])
    .map((reference) => reference.identifier)
}

function* getDocumentCookieReferences(globalScope: Scope.Scope) {
  const references = ['window', 'document'].flatMap((name) => globalScope.set.get(name)?.references ?? [])
  for (const reference of references) {
    // prettier-ignore
    const parent = closest(reference.identifier, (node) => (node.type === "MemberExpression" &&
      node.property.type === "Identifier" &&
      node.property.name === "cookie"));
    if (parent) yield parent
  }
}

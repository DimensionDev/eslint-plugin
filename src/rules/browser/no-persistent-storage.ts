import type { Scope } from '@typescript-eslint/utils/dist/ts-eslint'
import { closest } from '../../node'
import { createRule } from '../../rule'

export default createRule({
  name: 'browser/no-persistent-storage',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow use browser persistent storage',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalid: 'Disallow use browser persistent storage',
    },
  },
  create(context) {
    const globalScope = context.getScope()
    return {
      Program() {
        for (const node of getStorageReferences(globalScope)) {
          context.report({ node, messageId: 'invalid' })
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
    const parent = closest(reference.identifier, (node) => (
      node.type === 'MemberExpression' &&
      node.property.type === 'Identifier' &&
      node.property.name === 'cookie'
    ))
    if (parent) yield parent
  }
}

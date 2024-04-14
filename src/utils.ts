import type { SourceCode } from "@typescript-eslint/utils/ts-eslint"
import type { Scope } from "@typescript-eslint/scope-manager"

export type Predicate<T> = (value: T) => boolean

export function wrap<T, R = T>(input: T, callback: (input: T) => R) {
  return callback(input)
}

export function quote(input: string) {
  return JSON.stringify(input)
}

export function isValidVariableName(input: string) {
  return /^\p{ID_Start}\p{ID_Continue}+$/u.test(input)
}

export function property(name: string) {
  return isValidVariableName(name) ? '.' + name : `[${name}]`
}

export function findLastIndex<T>(elements: T[], predicate: Predicate<T>): number {
  let index = elements.length
  while (index) {
    index -= 1
    if (predicate(elements[index])) return index
  }
  return -1
}

/** ----- ESLint Helper ----- */

/**
 * `context.sourceCode.getScope()` requires at least one argument, no-argument usage (global scope)
 * is no longer supported.
 *
 * https://github.com/ota-meshi/eslint-compat-utils/blob/96387ca53dc08306d773c33b3b003582721084a1/src/get-source-code.ts#L36
 */
export function getGlobalScope(sourceCode: Readonly<SourceCode>): Scope | null {
  return sourceCode.scopeManager?.scopes[0] ?? null;
}

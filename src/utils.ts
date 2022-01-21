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

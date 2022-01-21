export type Predicate<T> = (value: T) => boolean

export function wrap<T, R = T>(input: T, callback: (input: T) => R) {
  return callback(input)
}

export function findLastIndex<T>(elements: T[], predicate: Predicate<T>): number {
  let index = elements.length
  while (index) {
    index -= 1
    if (predicate(elements[index])) return index
  }
  return -1
}

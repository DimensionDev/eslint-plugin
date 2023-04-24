import { runTest } from '../../spec.js'
import module from './prefer-return-type-annotation.js'

runTest({
  module,
  *valid() {
    yield 'function foo() { return [] as const }'
  },
  *invalid() {
    yield {
      code: '() => { return foo as T }',
      output: '(): T => { return foo }',
      errors: [{ messageId: 'move-type' }],
    }
    yield {
      code: 'async () => { return foo as T }',
      output: 'async (): Promise<T> => { return foo }',
      errors: [{ messageId: 'move-type' }],
    }
    yield {
      code: 'async () => { try { return (await foo) as T } catch {} }',
      output: 'async (): Promise<T> => { try { return await foo } catch {} }',
      errors: [{ messageId: 'move-type' }],
    }
    yield {
      code: 'function foo() { return bar() as Promise<T> }',
      output: 'function foo(): Promise<T> { return bar() }',
      errors: [{ messageId: 'move-type' }],
    }
    yield {
      code: 'function foo() { return bar() as T }',
      output: 'function foo(): T { return bar() }',
      errors: [{ messageId: 'move-type' }],
    }
    yield {
      code: 'async function foo() { return bar() as Promise<T> }',
      output: 'async function foo(): Promise<T> { return bar() }',
      errors: [{ messageId: 'move-type' }],
    }
    yield {
      code: 'async function foo() { return (await bar()) as T }',
      output: 'async function foo(): Promise<T> { return bar() }',
      errors: [{ messageId: 'move-type' }],
    }
    yield {
      code: 'async function foo() { return {} as Promise<T> }',
      output: 'async function foo(): Promise<T> { return {} }',
      errors: [{ messageId: 'move-type' }],
    }
  },
})

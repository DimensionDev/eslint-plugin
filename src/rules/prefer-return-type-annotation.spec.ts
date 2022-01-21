import { runTest } from '../spec'
import module from './prefer-return-type-annotation'

runTest({
  module,
  *invalid() {
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

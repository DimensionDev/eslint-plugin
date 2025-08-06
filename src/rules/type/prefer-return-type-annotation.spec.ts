import { tester } from '../../spec.ts'
import module from './prefer-return-type-annotation.ts'

tester.test(module, {
  valid: ['function foo() { return [] as const }'],
  invalid: [
    {
      code: '() => { return foo as T }',
      output: '(): T => { return foo }',
      errors: [{ messageId: 'move-type' }],
    },
    {
      code: 'async () => { return foo as T }',
      output: 'async (): Promise<T> => { return foo }',
      errors: [{ messageId: 'move-type' }],
    },
    {
      code: 'async () => { try { return (await foo) as T } catch {} }',
      output: 'async (): Promise<T> => { try { return await foo } catch {} }',
      errors: [{ messageId: 'move-type' }],
    },
    {
      code: 'function foo() { return bar() as Promise<T> }',
      output: 'function foo(): Promise<T> { return bar() }',
      errors: [{ messageId: 'move-type' }],
    },
    {
      code: 'function foo() { return bar() as T }',
      output: 'function foo(): T { return bar() }',
      errors: [{ messageId: 'move-type' }],
    },
    {
      code: 'async function foo() { return bar() as Promise<T> }',
      output: 'async function foo(): Promise<T> { return bar() }',
      errors: [{ messageId: 'move-type' }],
    },
    {
      code: 'async function foo() { return (await bar()) as T }',
      output: 'async function foo(): Promise<T> { return bar() }',
      errors: [{ messageId: 'move-type' }],
    },
    {
      code: 'async function foo() { return {} as Promise<T> }',
      output: 'async function foo(): Promise<T> { return {} }',
      errors: [{ messageId: 'move-type' }],
    },
  ],
})

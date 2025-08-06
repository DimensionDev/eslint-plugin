import { tester } from '../spec.ts'
import module from './no-redundant-variable.ts'

tester.test(module, {
  invalid: [
    {
      code: "function example() { const foo: string = 'bar'; return foo }",
      output: "function example() {  return ('bar') as string }",
      errors: [{ messageId: 'invalid' }],
    },
    {
      code: 'async function example() { const foo: string = await bar; return foo }',
      output: 'async function example() {  return (bar) as Promise<string> }',
      errors: [{ messageId: 'invalid' }],
    },
    {
      code: 'async function example() { try { const foo = await bar; return foo } catch {} }',
      output: 'async function example() { try {  return await bar } catch {} }',
      errors: [{ messageId: 'invalid' }],
    },
  ],
})

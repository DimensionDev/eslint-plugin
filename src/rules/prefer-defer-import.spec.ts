import { tester } from '../spec.ts'
import module from './prefer-defer-import.ts'

tester.test(module, {
  valid: [
    `import foo from "bar";`,
    {
      filename: 'test.ts',
      code: `import foo from "bar";`,
      options: [{ eagerPackages: ['bar'] }],
    },
    // type only
    {
      code: `import type foo from "bar"; import type { foo } from "bar"; export type { foo } from "bar";`,
      options: [{ eagerPackages: [] }],
    },
    // already added defer
    {
      code: `import defer * as foo from 'bar';`,
      options: [{ eagerPackages: [] }],
    },
  ],
  invalid: [
    // single case
    {
      code: `import * as foo from "bar"; foo.a; ({ foo })`,
      output: `import defer * as foo from "bar"; foo.a; ({ foo })`,
      options: [{ deferPackages: ['bar'] }],
      errors: [{ messageId: 'prefer' }],
    },
    {
      code: `import foo from "bar" assert { a: "b" }; foo.a; ({ foo })`,
      output: `import defer * as foo from "bar" assert { a: "b" }; foo.default.a; ({ foo: foo.default })`,
      options: [{ deferPackages: ['bar'] }],
      errors: [{ messageId: 'prefer' }],
    },
    {
      code: `import { foo } from "bar"; foo.a; ({ foo })`,
      output: `import defer * as bar from "bar"; bar.foo.a; ({ foo: bar.foo })`,
      options: [{ deferPackages: ['bar'] }],
      errors: [{ messageId: 'prefer' }],
    },
    {
      code: `import { foo as foo_ } from "bar"; foo_.a; ({ foo_ })`,
      output: `import defer * as bar from "bar"; bar.foo.a; ({ foo_: bar.foo })`,
      options: [{ deferPackages: ['bar'] }],
      errors: [{ messageId: 'prefer' }],
    },
    // complex case
    {
      code: `import a, * as b from "bar"; a.a; b.b; ({ a, b })`,
      output: `import defer * as b from "bar"; b.default.a; b.b; ({ a: b.default, b })`,
      options: [{ eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    },
    {
      code: `import a, { b } from "bar"; a.a; b.b; ({ a, b })`,
      output: `import defer * as a from "bar"; a.default.a; a.b.b; ({ a: a.default, b: a.b })`,
      options: [{ eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    },
    {
      code: `import a, { b, c as d } from "bar"; a.a; b.b; d.d ({ a, b, d })`,
      output: `import defer * as a from "bar"; a.default.a; a.b.b; a.c.d ({ a: a.default, b: a.b, d: a.c })`,
      options: [{ eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    },
    // with typescript
    {
      code: `import { type a, type b, type c as d } from "bar"; type X = [a, b, d]`,
      output: `import type { a, b, c as d } from "bar"; type X = [a, b, d]`,
      options: [{ eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    },
    {
      code: `import a, { type b, c } from "bar"; a.a; c.c; type X = b`,
      output: `import defer * as a from "bar"; import type { b } from "bar"; a.default.a; a.c.c; type X = b`,
      options: [{ eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    },
    {
      code: `import a, { } from "bar"; a.a`,
      output: `import defer * as a from "bar"; a.default.a`,
      options: [{ eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    },
    // exports, no fixer
    {
      code: `export { a } from "bar";`,
      options: [{ eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    },
    {
      code: `export * as bar from "bar";`,
      options: [{ eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    },
    {
      code: `export * from "bar";`,
      options: [{ eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    },
  ],
})

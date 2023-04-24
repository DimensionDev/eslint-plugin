import { runTest } from '../spec.js'
import module from './prefer-defer-import.js'

runTest({
  module,
  *valid(cast) {
    // no need
    yield cast({
      code: `import foo from "bar";`,
      options: [{ syntax: 'webpack-magic-comment', deferPackages: [] }],
    })
    yield cast({
      code: `import foo from "bar";`,
      options: [{ syntax: 'webpack-magic-comment', eagerPackages: ['bar'] }],
    })
    // type only
    yield cast({
      code: `import type foo from "bar"; import type { foo } from "bar"; export type { foo } from "bar";`,
      options: [{ syntax: 'webpack-magic-comment', eagerPackages: [] }],
    })
    // already added only
    yield cast({
      code: `import * as foo from /* webpackDefer: true */ 'bar';`,
      options: [{ syntax: 'webpack-magic-comment', eagerPackages: [] }],
    })
  },
  *invalid(cast) {
    // single case
    yield cast({
      code: `import * as foo from "bar"; foo.a; ({ foo })`,
      output: `import * as foo from /* webpackDefer: true */ "bar"; foo.a; ({ foo })`,
      options: [{ syntax: 'webpack-magic-comment', deferPackages: ['bar'] }],
      errors: [{ messageId: 'prefer' }],
    })

    yield cast({
      code: `import foo from "bar" assert { a: "b" }; foo.a; ({ foo })`,
      output: `import * as foo from /* webpackDefer: true */ "bar" assert { a: "b" }; foo.default.a; ({ foo: foo.default })`,
      options: [{ syntax: 'webpack-magic-comment', deferPackages: ['bar'] }],
      errors: [{ messageId: 'prefer' }],
    })

    yield cast({
      code: `import { foo } from "bar"; foo.a; ({ foo })`,
      output: `import * as bar from /* webpackDefer: true */ "bar"; bar.foo.a; ({ foo: bar.foo })`,
      options: [{ syntax: 'webpack-magic-comment', deferPackages: ['bar'] }],
      errors: [{ messageId: 'prefer' }],
    })
    yield cast({
      code: `import { foo as foo_ } from "bar"; foo_.a; ({ foo_ })`,
      output: `import * as bar from /* webpackDefer: true */ "bar"; bar.foo.a; ({ foo_: bar.foo })`,
      options: [{ syntax: 'webpack-magic-comment', deferPackages: ['bar'] }],
      errors: [{ messageId: 'prefer' }],
    })

    // complex case
    yield cast({
      code: `import a, * as b from "bar"; a.a; b.b; ({ a, b })`,
      output: `import * as b from /* webpackDefer: true */ "bar"; b.default.a; b.b; ({ a: b.default, b })`,
      options: [{ syntax: 'webpack-magic-comment', eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    })
    yield cast({
      code: `import a, { b } from "bar"; a.a; b.b; ({ a, b })`,
      output: `import * as a from /* webpackDefer: true */ "bar"; a.default.a; a.b.b; ({ a: a.default, b: a.b })`,
      options: [{ syntax: 'webpack-magic-comment', eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    })
    yield cast({
      code: `import a, { b, c as d } from "bar"; a.a; b.b; d.d ({ a, b, d })`,
      output: `import * as a from /* webpackDefer: true */ "bar"; a.default.a; a.b.b; a.c.d ({ a: a.default, b: a.b, d: a.c })`,
      options: [{ syntax: 'webpack-magic-comment', eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    })

    // with typescript
    yield cast({
      code: `import { type a, type b, type c as d } from "bar"; type X = [a, b, d]`,
      output: `import type { a, b, c as d } from "bar"; type X = [a, b, d]`,
      options: [{ syntax: 'webpack-magic-comment', eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    })
    yield cast({
      code: `import a, { type b, c } from "bar"; a.a; c.c; type X = b`,
      output: `import * as a from /* webpackDefer: true */ "bar"; import type { b } from "bar"; a.default.a; a.c.c; type X = b`,
      options: [{ syntax: 'webpack-magic-comment', eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    })
    yield cast({
      code: `import a, { } from "bar"; a.a`,
      output: `import * as a from /* webpackDefer: true */ "bar"; a.default.a`,
      options: [{ syntax: 'webpack-magic-comment', eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    })

    // exports, no fixer
    yield cast({
      code: `export { a } from "bar";`,
      options: [{ syntax: 'webpack-magic-comment', eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    })
    yield cast({
      code: `export * as bar from "bar";`,
      output: `export * as bar from /* webpackDefer: true */ "bar";`,
      options: [{ syntax: 'webpack-magic-comment', eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    })
    yield cast({
      code: `export * from "bar";`,
      options: [{ syntax: 'webpack-magic-comment', eagerPackages: [] }],
      errors: [{ messageId: 'prefer' }],
    })
  },
})

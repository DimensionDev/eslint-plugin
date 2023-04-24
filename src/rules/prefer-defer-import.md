<!-- begin title -->

# `@masknet/prefer-defer-import`

Prefer defer import a module. See <https://github.com/tc39/proposal-defer-import-eval> and <https://github.com/webpack/webpack/pull/16567/>.

<!-- end title -->

## Rule Details

## Options

<!-- begin options -->

```ts
/**
 * @minItems Infinity
 */
export type Options = [
  | {
      /**
       * @minItems 0
       */
      deferPackages?: string[]
      syntax?: 'webpack-magic-comment'
    }
  | {
      /**
       * @minItems 0
       */
      eagerPackages?: string[]
      syntax?: 'webpack-magic-comment'
    }
]
```

<!-- end options -->

### :x: Incorrect

```ts
import { foo } from 'bar'
foo
```

### :white_check_mark: Correct

```ts
import * as foo from /* webpackDefer: true */ 'bar'
foo.foo
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [x] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

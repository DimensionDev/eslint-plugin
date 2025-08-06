<!-- begin title -->

# `@masknet/prefer-defer-import`

Prefer defer import a module.

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
    }
  | {
      /**
       * @minItems 0
       */
      eagerPackages?: string[]
    },
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
import defer * as foo from "bar";
foo.foo;
```

## Attributes

<!-- begin attributes -->

- [ ] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [x] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

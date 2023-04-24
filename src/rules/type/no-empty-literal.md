<!-- begin title -->

# `@masknet/type/no-empty-literal`

Disallow empty {array,object} literal

<!-- end title -->

## Rule Details

Disallow empty {array,object} literal

## Options

<!-- begin options -->

```ts
/**
 * @minItems Infinity
 */
export type Options = [
  {
    array?: string
    object?: string
  }
]
```

<!-- end options -->

### :x: Incorrect

```ts
const foo = []
const bar = {}
```

## Attributes

<!-- begin attributes -->

- [ ] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [x] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

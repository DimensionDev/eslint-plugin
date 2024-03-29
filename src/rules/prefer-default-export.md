<!-- begin title -->

# `@masknet/prefer-default-export`

Enforce default export location at top or bottom

<!-- end title -->

## Rule Details

## Options

<!-- begin options -->

```ts
/**
 * @minItems Infinity
 */
export type Options = ['at-top' | 'at-bottom']
```

<!-- end options -->

### :x: Incorrect

```ts
/* eslint @masknet/prefer-default-export: 'at-top' */
export const foo = ''
export default {}
export const bar = ''
```

### :white_check_mark: Correct

```ts
/* eslint @masknet/prefer-default-export: 'at-top' */
export default {}
export const foo = ''
export const bar = ''
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [x] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

<!-- begin title -->

# `@dimensiondev/prefer-default-export`

Enforce default export location at top or bottom

<!-- end title -->

## Rule Details

## Options

<!-- begin options -->

```ts
export type Options = ['at-top' | 'at-bottom']
```

<!-- end options -->

### :x: Incorrect

```ts
/* eslint @dimensiondev/prefer-default-export: 'at-top' */
export const foo = ''
export default {}
export const bar = ''
```

### :white_check_mark: Correct

```ts
/* eslint @dimensiondev/prefer-default-export: 'at-top' */
export default {}
export const foo = ''
export const bar = ''
```

## Attributes

<!-- begin attributes -->

- [ ] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [x] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

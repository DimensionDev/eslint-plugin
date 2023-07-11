<!-- begin title -->

# `@masknet/no-top-level`

Disallow side-effect at module top-level

<!-- end title -->

## Rule Details

Don't make side effect at top level.

## Options

<!-- begin options -->

```ts
/**
 * @minItems Infinity
 */
export type Options = [
  {
    'variable'?: boolean
    'side-effect'?: boolean
  },
]
```

<!-- end options -->

### :x: Incorrect

```ts
console.log('bar')
```

### :white_check_mark: Correct

```ts
function foo() {
  console.log('bar')
}
```

## When Not To Use It

When you have to run side effects at the top level.

## Attributes

<!-- begin attributes -->

- [ ] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [x] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

## Thanks

<https://github.com/HKalbasi/eslint-plugin-toplevel>

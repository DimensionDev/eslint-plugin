<!-- begin title -->

# `@masknet/jsx/no-logical`

Limit the complexity of JSX logic expression

<!-- end title -->

## Rule Details

## Options

<!-- begin options -->

```ts
/**
 * @minItems Infinity
 */
export type Options = [
  | number
  | {
      attribute?: number
      element?: number
    },
]
```

<!-- end options -->

### :x: Incorrect

```jsx
<foo bar={1 || 2 || 3} />
<foo>{1 || 2 || 3}</foo>
<foo>{1 ? 2 : 3}</foo>
```

### :white_check_mark: Correct

```jsx
const value = 1 || 2 || 3
const bar = <foo bar={value} />
const baz = <foo>{value}</foo>
```

## Attributes

<!-- begin attributes -->

- [ ] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [x] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

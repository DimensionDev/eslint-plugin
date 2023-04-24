<!-- begin title -->

# `@masknet/array/prefer-from`

Prefer `new Array(...)` over `Array.from(...)`

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
declare const elements: string[][]
new Array(elements)
```

### :white_check_mark: Correct

```ts
declare const elements: string[][]
Array.from(elements)
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

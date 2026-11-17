<!-- begin title -->

# `@masknet/array/prefer-from`

Disallow `new Array(...)` and prefer `TypedArray.from(...)` for iterable input

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
new Array(3)
new Uint8Array([1, 2, 3])
```

`new Array(...)` is reported without an autofix because `new Array(length)` creates a sparse array, which is not equivalent to the dense array produced by common alternatives.

### :white_check_mark: Correct

```ts
Uint8Array.from([1, 2, 3])
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

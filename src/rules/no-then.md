<!-- begin title -->

# `@dimensiondev/no-then`

Disallow `Promise#then(...)`

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
promise.then(
  () => 1,
  () => 2
)
```

### :white_check_mark: Correct

```ts
try {
  await promise
  return 1
} catch {
  return 2
}
```

## When Not To Use It

When you need to handle the promise directly, or it's easier to read with "then".

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

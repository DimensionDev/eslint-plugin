<!-- begin title -->

# `@dimensiondev/no-redundant-variable`

Disallow redundant variable

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
async function example() {
  const foo = 'bar'
  return foo
}
```

### :white_check_mark: Correct

```ts
async function example() {
  return 'bar'
}
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

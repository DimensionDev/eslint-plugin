<!-- begin title -->

# `@dimensiondev/string/no-interpolation`

Disallow simple string interpolation

<!-- end title -->

## Rule Details

Template literal string expressions cross-lines reduce readability

### :x: Incorrect

<!-- prettier-ignore -->
```ts
const foo = `foo${bar
.toString()}baz`
```

### :white_check_mark: Correct

```ts
const foo = `foo${bar.toString()}baz`
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

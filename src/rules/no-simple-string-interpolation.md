<!-- begin title -->

# `@dimensiondev/no-simple-string-interpolation`

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

## When Not To Use It

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

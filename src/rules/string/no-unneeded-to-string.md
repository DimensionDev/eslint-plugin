<!-- begin title -->

# `@dimensiondev/string/no-unneeded-to-string`

Disallow `String#toString()` when simpler alternatives exist

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
declare const input: string
input.toString()
```

### :white_check_mark: Correct

```ts
declare const input: string
input
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [x] :thought_balloon: Requires type information

<!-- end attributes -->

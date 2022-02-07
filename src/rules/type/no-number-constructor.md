<!-- begin title -->

# `@dimensiondev/type/no-number-constructor`

Disallow use `Number` constructor

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
Number(input)
```

### :white_check_mark: Correct

```ts
Number.parseInt(input)
Number.parseFloat(input)
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

<!-- begin title -->

# `@dimensiondev/no-unneeded-flat-map`

Disallow `Array#flatMap((x) => x)` when simpler alternatives exist

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
declare const elements: string[][]
elements.flatMap((x) => x)
```

### :white_check_mark: Correct

```ts
declare const elements: string[][]
elements.flat()
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

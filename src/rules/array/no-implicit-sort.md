<!-- begin title -->

# `@masknet/array/no-implicit-sort`

Enforce `Array#sort` provide comparator function

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
declare const elements: number[]
elements.sort()
```

### :white_check_mark: Correct

```ts
declare const elements: number[]
elements.sort((a, b) => a - b)
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [x] :thought_balloon: Requires type information

<!-- end attributes -->

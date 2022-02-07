<!-- begin title -->

# `@dimensiondev/type/no-wrapper-type-reference`

Disallow wrapper type for type reference

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
const n: BigInt
const n: Boolean
const n: Number
const n: String
const n: Symbol
```

### :white_check_mark: Correct

```ts
const n: bigint
const n: boolean
const n: number
const n: string
const n: symbol
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

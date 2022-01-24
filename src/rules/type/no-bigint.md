<!-- begin title -->

# `@dimensiondev/type/no-bigint`

Disallow use BigInt

<!-- end title -->

## Rule Details

Safari 13.x not supported [BigInt](https://caniuse.com/bigint)

### :x: Incorrect

```ts
1n // bigint literal
BigInt(1) // bigint wrapper type
new BigInt64Array() // typed array
new BigUint64Array() // typed array
```

### :white_check_mark: Correct

Use the following library instead

- <https://npm.im/bignumber.js>
- <https://npm.im/decimal.js>
- <https://npm.im/bn.js>

## When Not To Use It

see <https://caniuse.com/bigint>

## Attributes

<!-- begin attributes -->

- [ ] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [x] :thought_balloon: Requires type information

<!-- end attributes -->

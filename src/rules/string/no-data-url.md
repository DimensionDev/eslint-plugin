<!-- begin title -->

# `@dimensiondev/string/no-data-url`

Disallow use Data URL

<!-- end title -->

## Rule Details

Disallow use Data URL

### :x: Incorrect

<!-- prettier-ignore -->
```ts
const foo = `data:...`
const bar = 'data:...'
```

### :white_check_mark: Correct

Please use <https://webpack.js.org/guides/asset-modules/> or other method save blob file in local

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

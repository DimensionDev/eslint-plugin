<!-- begin title -->

# `@masknet/string/no-simple-template-literal`

Disallow simple template-literal

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
const foo = `example`
const bar = `${foo}`
const baz = { [`${bar}`]: foo }
const qux = { [`bar`]: foo }
```

### :white_check_mark: Correct

```ts
const foo = 'example'
const bar = foo
const baz = { [bar]: foo }
const qux = { bar: foo }
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

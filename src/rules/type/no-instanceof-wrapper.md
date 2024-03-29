<!-- begin title -->

# `@masknet/type/no-instanceof-wrapper`

Disallow `instanceof` for wrapper objects

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
x instanceof Array
x instanceof BigInt
x instanceof Boolean
x instanceof Function
x instanceof Number
x instanceof Object
x instanceof String
x instanceof Symbol
```

### :white_check_mark: Correct

```ts
Array.isArray(x)
typeof x === 'bigint'
typeof x === 'boolean'
typeof x === 'function'
typeof x === 'number'
typeof x === 'object'
typeof x === 'string'
typeof x === 'symbol'
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

## Thanks

- <https://github.com/mysticatea/eslint-plugin>
- <https://github.com/sindresorhus/eslint-plugin-unicorn>

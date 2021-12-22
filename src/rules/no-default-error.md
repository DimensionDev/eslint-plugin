<!-- begin title -->

# `@dimensiondev/no-default-error`

Restrict the usage of default (unextended) error

<!-- end title -->

## Rule Details

This rule aims to rescrict the usage of default errors in the project (in favor of custom ones)

### :x: Incorrect

```ts
throw Error()
throw new Error()
```

### :white_check_mark: Correct

```ts
class UserDefinedError extends Error {
  constructor(message) {
    super(message)
  }
}

throw new UserDefinedError()
```

## When Not To Use It

If you think you don't need to improve the readability of the Error Stack

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [x] :thought_balloon: Requires type information

<!-- end attributes -->

## Thanks

<https://github.com/andrewms2013/eslint-plugin-no-default-error>

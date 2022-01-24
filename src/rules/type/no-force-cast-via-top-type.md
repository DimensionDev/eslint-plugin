<!-- begin title -->

# `@dimensiondev/type/no-force-cast-via-top-type`

Disallowing cast a type `T` to unrelated or incompatible type `Q` via `T as any as Q`

<!-- end title -->

## Rule Details

Don't cast this expression to another type by `as any as T` or `as unknown as T`.

This is highly like an error.

If you have a good reason to do this, please ignore this error and provide a comment about why this is type safe.

### :x: Incorrect

```ts
const foo = T as any as Q
const foo = T as unknown as Q
```

## When Not To Use It

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

## Thanks

<https://github.com/andrewms2013/eslint-plugin-no-default-error>

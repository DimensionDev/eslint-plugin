<!-- begin title -->

# `@masknet/no-unsafe-date`

Disallow use unsafe Date methods

<!-- end title -->

## Rule Details

Mutating dates can create confusing bugs. Instead,
create new dates using a library like [date-fns](https://date-fns.org).

Only the following methods are allowed

- `.getTime()`
- `.getTimezoneOffset()`
- `.to{JSON,String}()`
- `.to{ISO,UTC,GMT}String()`
- `.toLocaleString()`
- `.toLocale{Date,Time}String()`
- `.valueOf()`

### :x: Incorrect

```ts
const expiration = new Date()
expiration.setFullYear(2010, 05, 23)
expiration.setHours(12)
expiration.setDate(17)
expiration.setSeconds(30)
```

## Attributes

<!-- begin attributes -->

- [ ] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [x] :thought_balloon: Requires type information

<!-- end attributes -->

## Thanks

<https://github.com/chdsbd/eslint-plugin-better-dates>

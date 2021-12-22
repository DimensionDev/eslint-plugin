<!-- begin title -->

# `@dimensiondev/no-locale-case`

Disallow use `.toLocale{Upper,Lower}Case()`

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
example.toLocaleUpperCase()
example.toLocaleLowerCase()
```

### :white_check_mark: Correct

```ts
example.toUpperCase()
example.toLowerCase()
```

## When Not To Use It

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

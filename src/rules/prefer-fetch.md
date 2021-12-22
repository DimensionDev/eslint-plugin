<!-- begin title -->

# `@dimensiondev/prefer-fetch`

Enforce fetch

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
jQuery(element).load()
request()
axios.get()
new XMLHttpRequest()
```

### :white_check_mark: Correct

```ts
const response = await fetch(url, options)
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

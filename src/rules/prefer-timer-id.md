<!-- begin title -->

# `@dimensiondev/prefer-timer-id`

Enforce best practice with timer function

<!-- end title -->

## Rule Details

Requre store timer id on clear / cancel timer

### :x: Incorrect

```ts
setTimeout(() => {}, 1000)
```

### :white_check_mark: Correct

```ts
const timerId = setTimeout(() => {}, 1000)
clearTimeout(timerId)
```

## When Not To Use It

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [x] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

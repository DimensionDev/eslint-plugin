<!-- begin title -->

# `@dimensiondev/no-for-in`

Disallow use for-in

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
for (const key in object) {
}
```

### :white_check_mark: Correct

```ts
for (const key of Object.keys(object)) {
}
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

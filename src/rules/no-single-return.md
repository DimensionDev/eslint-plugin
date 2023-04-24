<!-- begin title -->

# `@masknet/no-single-return`

Disallow single-return

<!-- end title -->

## Rule Details

Disallow Single Return

### :x: Incorrect

```ts
function isGood(battery: Battery) {
  let out = false
  if (battery.charge) out = true
  if (battery.cycles < 10) out = true
  return out
}
```

### :white_check_mark: Correct

```ts
function isGood(battery: Battery) {
  if (battery.charge) return true
  if (battery.cycles < 10) return true
  return false
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

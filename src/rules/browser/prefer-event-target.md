<!-- begin title -->

# `@masknet/browser/prefer-event-target`

Prefer `EventTarget#{add,remove}EventListener()` over `on`-functions

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(reader.result)
  reader.onerror = reject
})
```

### :white_check_mark: Correct

```ts
new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => resolve(reader.result))
  reader.addEventListener('error', reject)
})
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [x] :thought_balloon: Requires type information

<!-- end attributes -->

## Thanks

- <https://github.com/sindresorhus/eslint-plugin-unicorn>

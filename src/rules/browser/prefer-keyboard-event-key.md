<!-- begin title -->

# `@masknet/browser/prefer-keyboard-event-key`

Prefer `KeyboardEvent#key` over `KeyboardEvent#{keyCode,charCode,which}`

<!-- end title -->

## Rule Details

<!-- cspell:ignore keydown -->

### :x: Incorrect

```ts
window.addEventListener('keydown', (event) => {
  if (event.keyCode === 8) {
    console.log('Backspace was pressed')
  }
})
```

### :white_check_mark: Correct

```ts
window.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    console.log('Backspace was pressed')
  }
})
```

## When Not To Use It

When you want to detect the keyboard key instead of a meaningful input.

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

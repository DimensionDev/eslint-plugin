<!-- begin title -->

# `@dimensiondev/browser/prefer-text-content`

Prefer `Element#textContent` over `Element#innerText`

<!-- end title -->

## Rule Details

| Legacy APIs             | Modern APIs                      |
| ----------------------- | -------------------------------- |
| `HTMLElement#innerText` | [Node#textContent][text-content] |

[text-content]: https://developer.mozilla.org/docs/Web/API/Node/textContent

### :x: Incorrect

```ts
declare const element: HTMLElement
element.innerText
```

### :white_check_mark: Correct

```ts
declare const element: HTMLElement
element.textContent
```

## When Not To Use It

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [x] :bulb: Suggestions
- [ ] :gear: Configurable
- [x] :thought_balloon: Requires type information

<!-- end attributes -->

## Thanks

- <https://github.com/sindresorhus/eslint-plugin-unicorn>

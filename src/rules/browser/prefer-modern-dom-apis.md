<!-- begin title -->

# `@dimensiondev/browser/prefer-modern-dom-apis`

Prefer Modern DOM APIs

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
declare const element: HTMLElement
element.appendChild(children)
element.removeChild(children)
```

### :white_check_mark: Correct

```ts
declare const element: HTMLElement
element.append(children)
children.remove()
```

## When Not To Use It

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [x] :thought_balloon: Requires type information

<!-- end attributes -->

## Thanks

- <https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-append.md>
- <https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-remove.md>
- <https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-dom-apis.md>

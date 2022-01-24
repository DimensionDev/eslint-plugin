<!-- begin title -->

# `@dimensiondev/browser/prefer-dataset`

Use `.dataset` instead of `Element#{get,set,has,remove}Attribute`

<!-- end title -->

## Rule Details

| Legacy APIs                         | Modern APIs                    |
| ----------------------------------- | ------------------------------ |
| `Element#getAttribute("data-*")`    | [HTMLElement#dataset][dataset] |
| `Element#setAttribute("data-*", *)` | [HTMLElement#dataset][dataset] |
| `Element#hasAttribute("data-*")`    | [HTMLElement#dataset][dataset] |
| `Element#removeAttribute("data-*")` | [HTMLElement#dataset][dataset] |

[dataset]: https://developer.mozilla.org/docs/Web/API/HTMLElement/dataset

### :x: Incorrect

```ts
declare const element: HTMLElement
element.getAttribute('data-test-id')
```

### :white_check_mark: Correct

```ts
declare const element: HTMLElement
element.dataset.testId
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

- <https://github.com/sindresorhus/eslint-plugin-unicorn>

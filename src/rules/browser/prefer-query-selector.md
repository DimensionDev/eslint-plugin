<!-- begin title -->

# `@dimensiondev/browser/prefer-query-selector`

Use `Element#querySelector` instead of `Element#getElementById`

<!-- end title -->

## Rule Details

| Legacy APIs                            | Modern APIs                                    |
| -------------------------------------- | ---------------------------------------------- |
| `Element#getElementById`               | [Element#querySelector][query-selector]        |
| `Element#getElementsBy{Class,Tag}Name` | [Element#querySelectorAll][query-selector-all] |

[query-selector]: https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector
[query-selector-all]: https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll

### :x: Incorrect

```ts
declare const element: HTMLElement
element.getElementById('hello')
```

### :white_check_mark: Correct

```ts
declare const element: HTMLElement
element.querySelector('#hello')
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

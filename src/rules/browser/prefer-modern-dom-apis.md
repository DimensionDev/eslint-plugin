<!-- begin title -->

# `@dimensiondev/browser/prefer-modern-dom-apis`

Prefer Modern DOM APIs

<!-- end title -->

## Rule Details

| Legacy APIs                                              | Modern APIs                    |
| -------------------------------------------------------- | ------------------------------ |
| `Element#appendChild`                                    | [Element#append][append]       |
| `Element#removeChild`                                    | [Element#remove][remove]       |
| `Element#replaceChild`                                   | [Element#replaceWith][replace] |
| `Element#insertBefore`                                   | [Element#before][before]       |
| `Element#insertAdjacent{Text,Element}("beforebegin", *)` | [Element#before][before]       |
| `Element#insertAdjacent{Text,Element}("afterbegin", *)`  | [Element#prepend][prepend]     |
| `Element#insertAdjacent{Text,Element}("beforeend", *)`   | [Element#append][append]       |
| `Element#insertAdjacent{Text,Element}("afterend", *)`    | [Element#after][after]         |

[append]: https://developer.mozilla.org/docs/Web/API/Element/append
[remove]: https://developer.mozilla.org/docs/Web/API/Element/remove
[replace]: https://developer.mozilla.org/docs/Web/API/Element/replaceWith
[before]: https://developer.mozilla.org/docs/Web/API/Element/before
[prepend]: https://developer.mozilla.org/docs/Web/API/Element/prepend
[after]: https://developer.mozilla.org/docs/Web/API/Element/after

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

- <https://github.com/sindresorhus/eslint-plugin-unicorn>

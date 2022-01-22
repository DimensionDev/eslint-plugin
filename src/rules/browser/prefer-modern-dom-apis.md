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
| `Element#{get,set,has,remove}Attribute("data-*")`        | [Element#dataset][dataset]     |

[append]: https://mdn.io/element-append
[remove]: https://mdn.io/element-remove
[replace]: https://mdn.io/element-replace-with
[before]: https://mdn.io/element-before
[prepend]: https://mdn.io/element-prepend
[after]: https://mdn.io/element-after
[dataset]: https://mdn.io/element-dataset

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

<!-- begin title -->

# `@dimensiondev/no-set-html`

Disallow use `.{inner,outer}HTML`

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
element.innerHTML = 'example'
element.outerHTML = 'example'
```

### :white_check_mark: Correct

```ts
element.innerHTML = escapeHTMLPolicy.createHTML('<img src=x onerror=alert(1)>')
element.setHTML('example', new Sanitizer())
```

see <https://developer.mozilla.org/en-US/docs/Web/API/TrustedHTML>
see <https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML>

## When Not To Use It

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

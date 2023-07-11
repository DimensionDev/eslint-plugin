<!-- begin title -->

# `@masknet/jsx/prefer-test-id`

Enforces `data-test-id` attribute is present on interactive DOM elements to help with UI testing

<!-- end title -->

## Rule Details

## Options

<!-- begin options -->

```ts
/**
 * @minItems Infinity
 */
export type Options = [
  {
    'id'?: string
    'elements'?: string[]
    'attributes'?: string[]
    'ignore-attributes'?: string[]
  },
]
```

<!-- end options -->

### :x: Incorrect

```jsx
<button>Download</button>
```

### :white_check_mark: Correct

```jsx
<button data-test-id="download-button">Download</button>
```

## Attributes

<!-- begin attributes -->

- [ ] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [x] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

## Thanks

- <https://github.com/davidcalhoun/eslint-plugin-test-selectors>

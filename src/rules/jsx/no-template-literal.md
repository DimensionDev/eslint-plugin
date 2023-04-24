<!-- begin title -->

# `@masknet/jsx/no-template-literal`

Disallow use template-literal in JSX

<!-- end title -->

## Rule Details

### :x: Incorrect

```jsx
<element>{`example ${foo}`}</element>
```

### :white_check_mark: Correct

```jsx
<element>example {foo}</element>
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

<!-- begin title -->

# `@dimensiondev/browser/prefer-location-assign`

Prefer `location.assign(...)` over `location.*`

<!-- end title -->

## Rule Details

Safely Navigate to target url

- [location.assign(...)](https://html.spec.whatwg.org/multipage/history.html#dom-location-assign)
- [location.replace(...)](https://html.spec.whatwg.org/multipage/history.html#dom-location-replace)

### :x: Incorrect

```ts
location = url
location.href = url
```

### :white_check_mark: Correct

```ts
location.assign(url)
location.replace(url)
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

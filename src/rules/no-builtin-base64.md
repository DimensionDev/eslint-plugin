<!-- begin title -->

# `@dimensiondev/no-builtin-base64`

Disallow use built-in base64 function

<!-- end title -->

## Rule Details

`atob` and `btoa` can't be handled

### :x: Incorrect

```ts
atob('...') // decode base64
btoa('...') // encode base64
```

### :white_check_mark: Correct

```ts
Buffer.from(input, 'base64') // decode base64 with Buffer
buffer.toString('base64') // encode base64 with Buffer
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

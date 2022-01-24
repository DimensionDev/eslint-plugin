<!-- begin title -->

# `@dimensiondev/type/prefer-return-type-annotation`

Enforce Move return type annotation to function return type

<!-- end title -->

## Rule Details

### :x: Incorrect

```ts
async function request() {
  const response = await fetch('...')
  return (await response.json()) as Payload
}
```

### :white_check_mark: Correct

```ts
async function request(): Promise<Payload> {
  const response = await fetch('...')
  return response.json()
}
```

## When Not To Use It

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

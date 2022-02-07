<!-- begin title -->

# `@dimensiondev/prefer-early-return`

Prefer early returns over full-body conditional wrapping in function declarations

<!-- end title -->

## Rule Details

## Options

<!-- begin options -->

```ts
export type Options = [
  {
    maximumStatements?: number
  }
]
```

<!-- end options -->

### :x: Incorrect

```ts
function foo() {
  if (foo) {
    bar()
    baz()
  }
}
```

### :white_check_mark: Correct

```ts
function foo() {
  if (!foo) return
  bar()
  baz()
}
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [x] :wrench: Fixable
- [ ] :bulb: Suggestions
- [x] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

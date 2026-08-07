<!-- begin title -->

# `@masknet/require-project-reference`

Require project references for local package imports

<!-- end title -->

## Rule Details

This rule detects local package imports that TypeScript resolves to a declaration file instead of the referenced project's source. Add the referenced project to the importing project's `tsconfig.json` `references`.

All referenced projects must enable both `declaration` and `declarationMap` so TypeScript can redirect navigation from emitted declarations to source files.

### :x: Incorrect

```ts
// packages/app/src/index.ts
import { data } from 'lib'
```

```json
// packages/app/tsconfig.json
{
  "references": []
}
```

### :white_check_mark: Correct

```json
// packages/app/tsconfig.json
{
  "references": [{ "path": "../lib/src" }]
}
```

## Attributes

<!-- begin attributes -->

- [ ] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [x] :thought_balloon: Requires type information

<!-- end attributes -->

<!-- begin title -->

# `@dimensiondev/jsx/no-class-component`

Disallow React Class Component

<!-- end title -->

## Rule Details

pre-exempt `getDerivedStateFromError` method

### :x: Incorrect

```js
import { Component } from 'react'

class Foo extends Component {
  render() {
    return <bar />
  }
}
```

### :white_check_mark: Correct

```js
const Foo = () => <bar />
```

## Attributes

<!-- begin attributes -->

- [x] :white_check_mark: Recommended
- [ ] :wrench: Fixable
- [ ] :bulb: Suggestions
- [ ] :gear: Configurable
- [ ] :thought_balloon: Requires type information

<!-- end attributes -->

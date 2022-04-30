# @dimensiondev/eslint-plugin

## Installation

You'll first need to install [eslint](https://eslint.org):

```bash
npm install --save-dev eslint
```

Next, install `@dimensiondev/eslint-plugin`:

```bash
# for stable version
npm install --save-dev @dimensiondev/eslint-plugin
# for unstable version
npm install --save-dev @dimensiondev/eslint-plugin --registry=https://npm.dimension.im
```

## Usage

Add `@dimensiondev` to the plugins section of your `.eslintrc` configuration file.

<!-- begin example configure -->

```json
{
  "$schema": "https://dimensiondev.github.io/eslint-plugin/src/schema.json",
  "plugins": ["@dimensiondev"],
  "rules": {
    "@dimensiondev/array/no-implicit-sort": "error",
    "@dimensiondev/array/no-unneeded-flat-map": "error",
    "@dimensiondev/array/prefer-from": "error",
    "@dimensiondev/browser/no-persistent-storage": "error",
    "@dimensiondev/browser/no-set-html": "error",
    "unicorn/prefer-dom-node-dataset": "off",
    "@dimensiondev/browser/prefer-dataset": "error",
    "unicorn/prefer-add-event-listener": "off",
    "unicorn/no-invalid-remove-event-listener": "off",
    "@dimensiondev/browser/prefer-event-target": "error",
    "unicorn/prefer-keyboard-event-key": "off",
    "@dimensiondev/browser/prefer-keyboard-event-key": "error",
    "@dimensiondev/browser/prefer-location-assign": "error",
    "unicorn/prefer-dom-node-append": "off",
    "unicorn/prefer-dom-node-remove": "off",
    "unicorn/prefer-modern-dom-apis": "off",
    "@dimensiondev/browser/prefer-modern-dom-apis": "error",
    "unicorn/prefer-query-selector": "off",
    "@dimensiondev/browser/prefer-query-selector": "error",
    "unicorn/prefer-dom-node-text-content": "off",
    "@dimensiondev/browser/prefer-text-content": "error",
    "@dimensiondev/jsx/no-class-component": "error",
    "@dimensiondev/jsx/no-logical": "off",
    "@dimensiondev/jsx/no-set-html": "error",
    "@dimensiondev/jsx/no-template-literal": "error",
    "@dimensiondev/jsx/prefer-test-id": "off",
    "@dimensiondev/string/no-interpolation": "error",
    "@dimensiondev/string/no-locale-case": "error",
    "@dimensiondev/string/no-simple-template-literal": "error",
    "@dimensiondev/string/no-unneeded-to-string": "error",
    "@dimensiondev/type/no-bigint": "off",
    "@dimensiondev/type/no-const-enum": "off",
    "@dimensiondev/type/no-empty-literal": "off",
    "@dimensiondev/type/no-force-cast-via-top-type": "error",
    "unicorn/no-instanceof-array": "off",
    "@dimensiondev/type/no-instanceof-wrapper": "error",
    "@dimensiondev/type/no-number-constructor": "error",
    "@dimensiondev/type/no-wrapper-type-reference": "error",
    "@dimensiondev/type/prefer-return-type-annotation": "error",
    "@dimensiondev/unicode/no-bidi": "off",
    "@dimensiondev/unicode/no-invisible": "error",
    "@dimensiondev/unicode/specific-set": "off",
    "@dimensiondev/ban-eslint-disable": "error",
    "@dimensiondev/no-builtin-base64": "error",
    "@dimensiondev/no-default-error": "error",
    "@dimensiondev/no-redundant-variable": "error",
    "@dimensiondev/no-single-return": "error",
    "@dimensiondev/no-then": "error",
    "@dimensiondev/no-timer": "off",
    "@dimensiondev/no-top-level": "off",
    "@dimensiondev/no-unsafe-date": "error",
    "@dimensiondev/prefer-default-export": "off",
    "@dimensiondev/prefer-early-return": "error",
    "@dimensiondev/prefer-fetch": "error",
    "@dimensiondev/prefer-timer-id": "error"
  }
}
```

<!-- end example configure -->

## Supported Rules

**Key**:
:white_check_mark: = recommended,
:wrench: = fixable,
:bulb: = suggestions,
:gear: = configurable,
:thought_balloon: = requires type information

<!-- begin rule list -->

- [array/no-implicit-sort][array$no_implicit_sort] :white_check_mark: :thought_balloon:\
  Enforce `Array#sort` provide comparator function
- [array/no-unneeded-flat-map][array$no_unneeded_flat_map] :white_check_mark: :wrench:\
  Disallow `Array#flatMap((x) => x)` when simpler alternatives exist
- [array/prefer-from][array$prefer_from] :white_check_mark: :wrench:\
  Prefer `new Array(...)` over `Array.from(...)`
- [browser/no-persistent-storage][browser$no_persistent_storage] :white_check_mark:\
  Disallow use browser persistent storage
- [browser/no-set-html][browser$no_set_html] :white_check_mark:\
  Disallow use `Element#{inner,outer}HTML`
- [browser/prefer-dataset][browser$prefer_dataset] :white_check_mark: :wrench: :thought_balloon:\
  Prefer `Element#dataset` over `Element#{get,set,has,remove}Attribute`
- [browser/prefer-event-target][browser$prefer_event_target] :white_check_mark: :wrench: :thought_balloon:\
  Prefer `EventTarget#{add,remove}EventListener()` over `on`-functions
- [browser/prefer-keyboard-event-key][browser$prefer_keyboard_event_key] :white_check_mark: :wrench: :thought_balloon:\
  Prefer `KeyboardEvent#key` over `KeyboardEvent#{keyCode,charCode,which}`
- [browser/prefer-location-assign][browser$prefer_location_assign] :white_check_mark: :wrench:\
  Prefer `location.assign(...)` over `location.*`
- [browser/prefer-modern-dom-apis][browser$prefer_modern_dom_apis] :white_check_mark: :wrench: :thought_balloon:\
  Prefer Modern DOM APIs
- [browser/prefer-query-selector][browser$prefer_query_selector] :white_check_mark: :wrench: :thought_balloon:\
  Prefer `Element#querySelector` over `Element#getElementById`
- [browser/prefer-text-content][browser$prefer_text_content] :white_check_mark: :bulb: :thought_balloon:\
  Prefer `Element#textContent` over `Element#innerText`
- [jsx/no-class-component][jsx$no_class_component] :white_check_mark:\
  Disallow React Class Component
- [jsx/no-logical][jsx$no_logical] :gear:\
  Limit the complexity of JSX logic expression
- [jsx/no-set-html][jsx$no_set_html] :white_check_mark:\
  Disallow use `dangerouslySetInnerHTML` jsx attribute
- [jsx/no-template-literal][jsx$no_template_literal] :white_check_mark: :wrench:\
  Disallow use template-literal in JSX
- [jsx/prefer-test-id][jsx$prefer_test_id] :gear:\
  Enforces `data-test-id` attribute is present on interactive DOM elements to help with UI testing
- [string/no-interpolation][string$no_interpolation] :white_check_mark:\
  Disallow simple string interpolation
- [string/no-locale-case][string$no_locale_case] :white_check_mark: :wrench:\
  Disallow use `String#toLocale{Upper,Lower}Case()`
- [string/no-simple-template-literal][string$no_simple_template_literal] :white_check_mark: :wrench:\
  Disallow simple template-literal
- [string/no-unneeded-to-string][string$no_unneeded_to_string] :white_check_mark: :wrench: :thought_balloon:\
  Disallow `String#toString()` when simpler alternatives exist
- [type/no-bigint][type$no_bigint] :thought_balloon:\
  Disallow use BigInt
- [type/no-const-enum][type$no_const_enum] :wrench:\
  Disallow use constants enumerate
- [type/no-empty-literal][type$no_empty_literal] :gear:\
  Disallow empty {array,object} literal
- [type/no-force-cast-via-top-type][type$no_force_cast_via_top_type] :white_check_mark:\
  Disallowing cast a type `T` to unrelated or incompatible type `Q` via `T as any as Q`
- [type/no-instanceof-wrapper][type$no_instanceof_wrapper] :white_check_mark: :wrench:\
  Disallow `instanceof` for wrapper objects
- [type/no-number-constructor][type$no_number_constructor] :white_check_mark:\
  Disallow use `Number` constructor
- [type/no-wrapper-type-reference][type$no_wrapper_type_reference] :white_check_mark: :wrench:\
  Disallow wrapper type for type reference
- [type/prefer-return-type-annotation][type$prefer_return_type_annotation] :white_check_mark: :wrench:\
  Enforce Move return type annotation to function return type
- [unicode/no-bidi][unicode$no_bidi] :wrench:\
  Detect and stop Trojan Source attacks
- [unicode/no-invisible][unicode$no_invisible] :white_check_mark: :wrench:\
  Disallow invisible characters
- [unicode/specific-set][unicode$specific_set] :wrench: :gear:\
  Limit the range of literal characters
- [ban-eslint-disable][ban_eslint_disable] :white_check_mark: :gear:\
  Ban `eslint-disable` comment directive
- [no-builtin-base64][no_builtin_base64] :white_check_mark: :wrench:\
  Disallow use built-in base64 function
- [no-default-error][no_default_error] :white_check_mark: :thought_balloon:\
  Restrict the usage of default (unextended) error
- [no-redundant-variable][no_redundant_variable] :white_check_mark: :wrench:\
  Disallow redundant variable
- [no-single-return][no_single_return] :white_check_mark:\
  Disallow single-return
- [no-then][no_then] :white_check_mark:\
  Disallow `Promise#then(...)`
- [no-timer][no_timer] \
  Disallow use timer function
- [no-top-level][no_top_level] :gear:\
  Disallow side-effect at module top-level
- [no-unsafe-date][no_unsafe_date] :white_check_mark: :thought_balloon:\
  Disallow use unsafe Date methods
- [prefer-default-export][prefer_default_export] :gear:\
  Enforce default export location at top or bottom
- [prefer-early-return][prefer_early_return] :white_check_mark: :wrench: :gear:\
  Prefer early returns over full-body conditional wrapping in function declarations
- [prefer-fetch][prefer_fetch] :white_check_mark:\
  Enforce fetch
- [prefer-timer-id][prefer_timer_id] :white_check_mark: :bulb:\
  Enforce best practice with timer function

[array$no_implicit_sort]: https://dimensiondev.github.io/eslint-plugin/src/rules/array/no-implicit-sort
[array$no_unneeded_flat_map]: https://dimensiondev.github.io/eslint-plugin/src/rules/array/no-unneeded-flat-map
[array$prefer_from]: https://dimensiondev.github.io/eslint-plugin/src/rules/array/prefer-from
[browser$no_persistent_storage]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/no-persistent-storage
[browser$no_set_html]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/no-set-html
[browser$prefer_dataset]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/prefer-dataset
[browser$prefer_event_target]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/prefer-event-target
[browser$prefer_keyboard_event_key]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/prefer-keyboard-event-key
[browser$prefer_location_assign]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/prefer-location-assign
[browser$prefer_modern_dom_apis]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/prefer-modern-dom-apis
[browser$prefer_query_selector]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/prefer-query-selector
[browser$prefer_text_content]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/prefer-text-content
[jsx$no_class_component]: https://dimensiondev.github.io/eslint-plugin/src/rules/jsx/no-class-component
[jsx$no_logical]: https://dimensiondev.github.io/eslint-plugin/src/rules/jsx/no-logical
[jsx$no_set_html]: https://dimensiondev.github.io/eslint-plugin/src/rules/jsx/no-set-html
[jsx$no_template_literal]: https://dimensiondev.github.io/eslint-plugin/src/rules/jsx/no-template-literal
[jsx$prefer_test_id]: https://dimensiondev.github.io/eslint-plugin/src/rules/jsx/prefer-test-id
[string$no_interpolation]: https://dimensiondev.github.io/eslint-plugin/src/rules/string/no-interpolation
[string$no_locale_case]: https://dimensiondev.github.io/eslint-plugin/src/rules/string/no-locale-case
[string$no_simple_template_literal]: https://dimensiondev.github.io/eslint-plugin/src/rules/string/no-simple-template-literal
[string$no_unneeded_to_string]: https://dimensiondev.github.io/eslint-plugin/src/rules/string/no-unneeded-to-string
[type$no_bigint]: https://dimensiondev.github.io/eslint-plugin/src/rules/type/no-bigint
[type$no_const_enum]: https://dimensiondev.github.io/eslint-plugin/src/rules/type/no-const-enum
[type$no_empty_literal]: https://dimensiondev.github.io/eslint-plugin/src/rules/type/no-empty-literal
[type$no_force_cast_via_top_type]: https://dimensiondev.github.io/eslint-plugin/src/rules/type/no-force-cast-via-top-type
[type$no_instanceof_wrapper]: https://dimensiondev.github.io/eslint-plugin/src/rules/type/no-instanceof-wrapper
[type$no_number_constructor]: https://dimensiondev.github.io/eslint-plugin/src/rules/type/no-number-constructor
[type$no_wrapper_type_reference]: https://dimensiondev.github.io/eslint-plugin/src/rules/type/no-wrapper-type-reference
[type$prefer_return_type_annotation]: https://dimensiondev.github.io/eslint-plugin/src/rules/type/prefer-return-type-annotation
[unicode$no_bidi]: https://dimensiondev.github.io/eslint-plugin/src/rules/unicode/no-bidi
[unicode$no_invisible]: https://dimensiondev.github.io/eslint-plugin/src/rules/unicode/no-invisible
[unicode$specific_set]: https://dimensiondev.github.io/eslint-plugin/src/rules/unicode/specific-set
[ban_eslint_disable]: https://dimensiondev.github.io/eslint-plugin/src/rules/ban-eslint-disable
[no_builtin_base64]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-builtin-base64
[no_default_error]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-default-error
[no_redundant_variable]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-redundant-variable
[no_single_return]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-single-return
[no_then]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-then
[no_timer]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-timer
[no_top_level]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-top-level
[no_unsafe_date]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-unsafe-date
[prefer_default_export]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-default-export
[prefer_early_return]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-early-return
[prefer_fetch]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-fetch
[prefer_timer_id]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-timer-id

<!-- end rule list -->

## LICENSE

[MIT](LICENSE)

# @masknet/eslint-plugin

## Installation

You'll first need to install [eslint](https://eslint.org):

```bash
npm install --save-dev eslint
```

Next, install `@masknet/eslint-plugin`:

```bash
npm install --save-dev @masknet/eslint-plugin
```

## Usage

Add `@masknet` to the plugins section of your `.eslintrc` configuration file.

<!-- begin example configure -->

```json
{
  "$schema": "https://dimensiondev.github.io/eslint-plugin/src/schema.json",
  "plugins": ["@masknet"],
  "rules": {
    "@masknet/array/no-unneeded-flat-map": "error",
    "@masknet/array/prefer-from": "error",
    "@masknet/browser/no-persistent-storage": "error",
    "@masknet/browser/no-set-html": "error",
    "@masknet/browser/prefer-location-assign": "error",
    "@masknet/jsx/no-class-component": "error",
    "@masknet/jsx/no-set-html": "error",
    "@masknet/jsx/no-template-literal": "error",
    "@masknet/jsx/no-unneeded-nested": "error",
    "@masknet/string/no-data-url": "error",
    "@masknet/string/no-interpolation": "error",
    "@masknet/string/no-locale-case": "error",
    "@masknet/string/no-simple-template-literal": "error",
    "@masknet/string/no-unneeded-to-string": "error",
    "@masknet/type/no-force-cast-via-top-type": "error",
    "unicorn/no-instanceof-array": "off",
    "@masknet/type/no-instanceof-wrapper": "error",
    "@masknet/type/no-number-constructor": "error",
    "@masknet/type/no-wrapper-type-reference": "error",
    "@masknet/type/prefer-return-type-annotation": "error",
    "@masknet/unicode/no-invisible": "error",
    "@masknet/no-builtin-base64": "error",
    "@masknet/no-default-error": "error",
    "@masknet/no-for-in": "error",
    "@masknet/no-redundant-variable": "error",
    "@masknet/no-single-return": "error",
    "@masknet/no-then": "error",
    "@masknet/no-unsafe-date": "error",
    "@masknet/prefer-defer-import": "error",
    "@masknet/prefer-early-return": "error",
    "@masknet/prefer-fetch": "error",
    "@masknet/prefer-timer-id": "error"
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

- [array/no-unneeded-flat-map][array$no_unneeded_flat_map] :white_check_mark: :wrench:\
  Disallow `Array#flatMap((x) => x)` when simpler alternatives exist
- [array/prefer-from][array$prefer_from] :white_check_mark: :wrench:\
  Prefer `new Array(...)` over `Array.from(...)`
- [browser/no-persistent-storage][browser$no_persistent_storage] :white_check_mark:\
  Disallow use browser persistent storage
- [browser/no-set-html][browser$no_set_html] :white_check_mark:\
  Disallow use `Element#{inner,outer}HTML`
- [browser/prefer-location-assign][browser$prefer_location_assign] :white_check_mark: :wrench:\
  Prefer `location.assign(...)` over `location.*`
- [jsx/no-class-component][jsx$no_class_component] :white_check_mark:\
  Disallow React Class Component
- [jsx/no-logical][jsx$no_logical] :gear:\
  Limit the complexity of JSX logic expression
- [jsx/no-set-html][jsx$no_set_html] :white_check_mark:\
  Disallow use `dangerouslySetInnerHTML` jsx attribute
- [jsx/no-template-literal][jsx$no_template_literal] :white_check_mark: :wrench:\
  Disallow use template-literal in JSX
- [jsx/no-unneeded-nested][jsx$no_unneeded_nested] :white_check_mark: :wrench:\
  Reduce unneeded JSXFragment nested
- [jsx/prefer-test-id][jsx$prefer_test_id] :gear:\
  Enforces `data-test-id` attribute is present on interactive DOM elements to help with UI testing
- [string/no-data-url][string$no_data_url] :white_check_mark:\
  Disallow use Data URL
- [string/no-interpolation][string$no_interpolation] :white_check_mark:\
  Disallow simple string interpolation
- [string/no-locale-case][string$no_locale_case] :white_check_mark: :wrench:\
  Disallow use `String#toLocale{Upper,Lower}Case()`
- [string/no-simple-template-literal][string$no_simple_template_literal] :white_check_mark: :wrench:\
  Disallow simple template-literal
- [string/no-unneeded-to-string][string$no_unneeded_to_string] :white_check_mark: :wrench: :thought_balloon:\
  Disallow `String#toString()` when simpler alternatives exist
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
- [no-builtin-base64][no_builtin_base64] :white_check_mark: :wrench:\
  Disallow use built-in base64 function
- [no-default-error][no_default_error] :white_check_mark: :thought_balloon:\
  Restrict the usage of default (unextended) error
- [no-for-in][no_for_in] :white_check_mark:\
  Disallow use for-in
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
- [prefer-defer-import][prefer_defer_import] :white_check_mark: :wrench: :gear:\
  Prefer defer import a module. See <https://github.com/tc39/proposal-defer-import-eval> and <https://github.com/webpack/webpack/pull/16567/>.
- [prefer-early-return][prefer_early_return] :white_check_mark: :wrench: :gear:\
  Prefer early returns over full-body conditional wrapping in function declarations
- [prefer-fetch][prefer_fetch] :white_check_mark:\
  Enforce fetch
- [prefer-timer-id][prefer_timer_id] :white_check_mark: :bulb:\
  Enforce best practice with timer function

[array$no_unneeded_flat_map]: https://dimensiondev.github.io/eslint-plugin/src/rules/array/no-unneeded-flat-map
[array$prefer_from]: https://dimensiondev.github.io/eslint-plugin/src/rules/array/prefer-from
[browser$no_persistent_storage]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/no-persistent-storage
[browser$no_set_html]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/no-set-html
[browser$prefer_location_assign]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/prefer-location-assign
[jsx$no_class_component]: https://dimensiondev.github.io/eslint-plugin/src/rules/jsx/no-class-component
[jsx$no_logical]: https://dimensiondev.github.io/eslint-plugin/src/rules/jsx/no-logical
[jsx$no_set_html]: https://dimensiondev.github.io/eslint-plugin/src/rules/jsx/no-set-html
[jsx$no_template_literal]: https://dimensiondev.github.io/eslint-plugin/src/rules/jsx/no-template-literal
[jsx$no_unneeded_nested]: https://dimensiondev.github.io/eslint-plugin/src/rules/jsx/no-unneeded-nested
[jsx$prefer_test_id]: https://dimensiondev.github.io/eslint-plugin/src/rules/jsx/prefer-test-id
[string$no_data_url]: https://dimensiondev.github.io/eslint-plugin/src/rules/string/no-data-url
[string$no_interpolation]: https://dimensiondev.github.io/eslint-plugin/src/rules/string/no-interpolation
[string$no_locale_case]: https://dimensiondev.github.io/eslint-plugin/src/rules/string/no-locale-case
[string$no_simple_template_literal]: https://dimensiondev.github.io/eslint-plugin/src/rules/string/no-simple-template-literal
[string$no_unneeded_to_string]: https://dimensiondev.github.io/eslint-plugin/src/rules/string/no-unneeded-to-string
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
[no_builtin_base64]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-builtin-base64
[no_default_error]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-default-error
[no_for_in]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-for-in
[no_redundant_variable]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-redundant-variable
[no_single_return]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-single-return
[no_then]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-then
[no_timer]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-timer
[no_top_level]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-top-level
[no_unsafe_date]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-unsafe-date
[prefer_default_export]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-default-export
[prefer_defer_import]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-defer-import
[prefer_early_return]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-early-return
[prefer_fetch]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-fetch
[prefer_timer_id]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-timer-id

<!-- end rule list -->

## LICENSE

[MIT](LICENSE)

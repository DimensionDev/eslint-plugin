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
    "@dimensiondev/ban-eslint-disable": "error",
    "@dimensiondev/browser/prefer-event-target": "error",
    "@dimensiondev/browser/prefer-keyboard-event-key": "error",
    "@dimensiondev/browser/prefer-location-assign": "error",
    "@dimensiondev/browser/prefer-modern-dom-apis": "error",
    "@dimensiondev/jsx/no-logical": "off",
    "@dimensiondev/jsx/no-template-literal": "error",
    "@dimensiondev/no-bidi-characters": "off",
    "@dimensiondev/no-bigint": "off",
    "@dimensiondev/no-builtin-base64": "error",
    "@dimensiondev/no-default-error": "error",
    "@dimensiondev/no-force-cast-via-top-type": "error",
    "@dimensiondev/no-implicit-array-sort": "error",
    "@dimensiondev/no-invisible-characters": "error",
    "@dimensiondev/no-locale-case": "error",
    "@dimensiondev/no-number-constructor": "error",
    "@dimensiondev/no-redundant-variable": "error",
    "@dimensiondev/no-simple-string-interpolation": "error",
    "@dimensiondev/no-simple-template-literal": "error",
    "@dimensiondev/no-single-return": "error",
    "@dimensiondev/no-then": "error",
    "@dimensiondev/no-timer": "off",
    "@dimensiondev/no-top-level": "off",
    "@dimensiondev/no-unneeded-flat-map": "error",
    "@dimensiondev/no-unneeded-to-string": "error",
    "@dimensiondev/no-unsafe-date": "error",
    "@dimensiondev/prefer-default-export": "off",
    "@dimensiondev/prefer-early-return": "error",
    "@dimensiondev/prefer-fetch": "error",
    "@dimensiondev/prefer-return-type-annotation": "error",
    "@dimensiondev/prefer-timer-id": "error",
    "@dimensiondev/unicode-specific-set": "off"
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

- [ban-eslint-disable][ban_eslint_disable] :white_check_mark: :gear:\
  Ban `eslint-disable` comment directive
- [browser/prefer-event-target][browser$prefer_event_target] :white_check_mark: :wrench: :thought_balloon:\
  Prefer `.{add,remove}EventListener()` over `on`-functions
- [browser/prefer-keyboard-event-key][browser$prefer_keyboard_event_key] :white_check_mark: :wrench: :thought_balloon:\
  Prefer KeyboardEvent#key
- [browser/prefer-location-assign][browser$prefer_location_assign] :white_check_mark: :wrench:\
  Enforce best practice with location
- [browser/prefer-modern-dom-apis][browser$prefer_modern_dom_apis] :white_check_mark: :wrench: :bulb: :thought_balloon:\
  Prefer Modern DOM APIs
- [jsx/no-logical][jsx$no_logical] :gear:\
  Limit the complexity of JSX logic expression
- [jsx/no-template-literal][jsx$no_template_literal] :white_check_mark: :wrench:\
  Disallow use template-literal in JSX
- [no-bidi-characters][no_bidi_characters] :wrench:\
  Detect and stop Trojan Source attacks
- [no-bigint][no_bigint] :thought_balloon:\
  Disallow use BigInt
- [no-builtin-base64][no_builtin_base64] :white_check_mark: :wrench:\
  Disallow use built-in base64 function
- [no-default-error][no_default_error] :white_check_mark: :thought_balloon:\
  Restrict the usage of default (unextended) error
- [no-force-cast-via-top-type][no_force_cast_via_top_type] :white_check_mark:\
  Disallowing cast a type T to unrelated or incompatible type Q via "T as any as Q"
- [no-implicit-array-sort][no_implicit_array_sort] :white_check_mark: :thought_balloon:\
  Enforce Array#sort provide comparator function
- [no-invisible-characters][no_invisible_characters] :white_check_mark: :wrench:\
  Disallow invisible characters
- [no-locale-case][no_locale_case] :white_check_mark: :wrench:\
  Disallow use `.toLocale{Upper,Lower}Case()`
- [no-number-constructor][no_number_constructor] :white_check_mark:\
  Disallow use `Number` constructor
- [no-redundant-variable][no_redundant_variable] :white_check_mark: :wrench:\
  Disallow redundant variable
- [no-simple-string-interpolation][no_simple_string_interpolation] :white_check_mark:\
  Disallow simple string interpolation
- [no-simple-template-literal][no_simple_template_literal] :white_check_mark: :wrench:\
  Disallow simple template-literal
- [no-single-return][no_single_return] :white_check_mark:\
  Disallow single-return
- [no-then][no_then] :white_check_mark:\
  Disallow `.then(...)`
- [no-timer][no_timer] \
  Disallow use timer function
- [no-top-level][no_top_level] :gear:\
  Disallow side-effect at module top-level
- [no-unneeded-flat-map][no_unneeded_flat_map] :white_check_mark: :wrench:\
  Disallow `.flatMap((x) => x)` when simpler alternatives exist
- [no-unneeded-to-string][no_unneeded_to_string] :white_check_mark: :wrench: :thought_balloon:\
  Disallow `.toString()` when simpler alternatives exist
- [no-unsafe-date][no_unsafe_date] :white_check_mark: :thought_balloon:\
  Disallow use unsafe Date methods
- [prefer-default-export][prefer_default_export] :gear:\
  Enforce default export location at top or bottom
- [prefer-early-return][prefer_early_return] :white_check_mark: :wrench: :gear:\
  Prefer early returns over full-body conditional wrapping in function declarations
- [prefer-fetch][prefer_fetch] :white_check_mark:\
  Enforce fetch
- [prefer-return-type-annotation][prefer_return_type_annotation] :white_check_mark: :wrench:\
  Enforce Move return type annotation to function return type
- [prefer-timer-id][prefer_timer_id] :white_check_mark: :bulb:\
  Enforce best practice with timer function
- [unicode-specific-set][unicode_specific_set] :wrench: :gear:\
  Limit the range of literal characters

[ban_eslint_disable]: https://dimensiondev.github.io/eslint-plugin/src/rules/ban-eslint-disable
[browser$prefer_event_target]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/prefer-event-target
[browser$prefer_keyboard_event_key]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/prefer-keyboard-event-key
[browser$prefer_location_assign]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/prefer-location-assign
[browser$prefer_modern_dom_apis]: https://dimensiondev.github.io/eslint-plugin/src/rules/browser/prefer-modern-dom-apis
[jsx$no_logical]: https://dimensiondev.github.io/eslint-plugin/src/rules/jsx/no-logical
[jsx$no_template_literal]: https://dimensiondev.github.io/eslint-plugin/src/rules/jsx/no-template-literal
[no_bidi_characters]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-bidi-characters
[no_bigint]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-bigint
[no_builtin_base64]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-builtin-base64
[no_default_error]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-default-error
[no_force_cast_via_top_type]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-force-cast-via-top-type
[no_implicit_array_sort]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-implicit-array-sort
[no_invisible_characters]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-invisible-characters
[no_locale_case]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-locale-case
[no_number_constructor]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-number-constructor
[no_redundant_variable]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-redundant-variable
[no_simple_string_interpolation]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-simple-string-interpolation
[no_simple_template_literal]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-simple-template-literal
[no_single_return]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-single-return
[no_then]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-then
[no_timer]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-timer
[no_top_level]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-top-level
[no_unneeded_flat_map]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-unneeded-flat-map
[no_unneeded_to_string]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-unneeded-to-string
[no_unsafe_date]: https://dimensiondev.github.io/eslint-plugin/src/rules/no-unsafe-date
[prefer_default_export]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-default-export
[prefer_early_return]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-early-return
[prefer_fetch]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-fetch
[prefer_return_type_annotation]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-return-type-annotation
[prefer_timer_id]: https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-timer-id
[unicode_specific_set]: https://dimensiondev.github.io/eslint-plugin/src/rules/unicode-specific-set

<!-- end rule list -->

## LICENSE

[MIT](LICENSE)

// 34 Rules
// 5  Configs
import browser$prefer_event_target from './rules/browser/prefer-event-target'
import browser$prefer_keyboard_event_key from './rules/browser/prefer-keyboard-event-key'
import browser$prefer_location_assign from './rules/browser/prefer-location-assign'
import browser$prefer_modern_dom_apis from './rules/browser/prefer-modern-dom-apis'
import jsx$no_logical from './rules/jsx/no-logical'
import jsx$no_template_literal from './rules/jsx/no-template-literal'
import jsx$prefer_test_id from './rules/jsx/prefer-test-id'
import string$no_interpolation from './rules/string/no-interpolation'
import string$no_locale_case from './rules/string/no-locale-case'
import string$no_simple_template_literal from './rules/string/no-simple-template-literal'
import string$no_unneeded_to_string from './rules/string/no-unneeded-to-string'
import unicode$no_bidi from './rules/unicode/no-bidi'
import unicode$no_invisible from './rules/unicode/no-invisible'
import unicode$specific_set from './rules/unicode/specific-set'
import ban_eslint_disable from './rules/ban-eslint-disable'
import no_bigint from './rules/no-bigint'
import no_builtin_base64 from './rules/no-builtin-base64'
import no_default_error from './rules/no-default-error'
import no_force_cast_via_top_type from './rules/no-force-cast-via-top-type'
import no_implicit_array_sort from './rules/no-implicit-array-sort'
import no_number_constructor from './rules/no-number-constructor'
import no_redundant_variable from './rules/no-redundant-variable'
import no_single_return from './rules/no-single-return'
import no_then from './rules/no-then'
import no_timer from './rules/no-timer'
import no_top_level from './rules/no-top-level'
import no_unneeded_flat_map from './rules/no-unneeded-flat-map'
import no_unsafe_date from './rules/no-unsafe-date'
import no_vue from './rules/no-vue'
import prefer_default_export from './rules/prefer-default-export'
import prefer_early_return from './rules/prefer-early-return'
import prefer_fetch from './rules/prefer-fetch'
import prefer_return_type_annotation from './rules/prefer-return-type-annotation'
import prefer_timer_id from './rules/prefer-timer-id'
export const rules = {
  'browser/prefer-event-target': browser$prefer_event_target,
  'browser/prefer-keyboard-event-key': browser$prefer_keyboard_event_key,
  'browser/prefer-location-assign': browser$prefer_location_assign,
  'browser/prefer-modern-dom-apis': browser$prefer_modern_dom_apis,
  'jsx/no-logical': jsx$no_logical,
  'jsx/no-template-literal': jsx$no_template_literal,
  'jsx/prefer-test-id': jsx$prefer_test_id,
  'string/no-interpolation': string$no_interpolation,
  'string/no-locale-case': string$no_locale_case,
  'string/no-simple-template-literal': string$no_simple_template_literal,
  'string/no-unneeded-to-string': string$no_unneeded_to_string,
  'unicode/no-bidi': unicode$no_bidi,
  'unicode/no-invisible': unicode$no_invisible,
  'unicode/specific-set': unicode$specific_set,
  'ban-eslint-disable': ban_eslint_disable,
  'no-bigint': no_bigint,
  'no-builtin-base64': no_builtin_base64,
  'no-default-error': no_default_error,
  'no-force-cast-via-top-type': no_force_cast_via_top_type,
  'no-implicit-array-sort': no_implicit_array_sort,
  'no-number-constructor': no_number_constructor,
  'no-redundant-variable': no_redundant_variable,
  'no-single-return': no_single_return,
  'no-then': no_then,
  'no-timer': no_timer,
  'no-top-level': no_top_level,
  'no-unneeded-flat-map': no_unneeded_flat_map,
  'no-unsafe-date': no_unsafe_date,
  'no-vue': no_vue,
  'prefer-default-export': prefer_default_export,
  'prefer-early-return': prefer_early_return,
  'prefer-fetch': prefer_fetch,
  'prefer-return-type-annotation': prefer_return_type_annotation,
  'prefer-timer-id': prefer_timer_id,
}
import all from './configs/all.json'
import base from './configs/base.json'
import fixable from './configs/fixable.json'
import recommended from './configs/recommended.json'
import recommended_requires_type_checking from './configs/recommended-requires-type-checking.json'
export const configs = {
  all,
  base,
  fixable,
  recommended,
  'recommended-requires-type-checking': recommended_requires_type_checking,
}

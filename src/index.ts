// 43 Rules
// 5  Configs
import array$no_implicit_sort from './rules/array/no-implicit-sort'
import array$no_unneeded_flat_map from './rules/array/no-unneeded-flat-map'
import array$prefer_from from './rules/array/prefer-from'
import browser$no_set_html from './rules/browser/no-set-html'
import browser$prefer_dataset from './rules/browser/prefer-dataset'
import browser$prefer_event_target from './rules/browser/prefer-event-target'
import browser$prefer_keyboard_event_key from './rules/browser/prefer-keyboard-event-key'
import browser$prefer_location_assign from './rules/browser/prefer-location-assign'
import browser$prefer_modern_dom_apis from './rules/browser/prefer-modern-dom-apis'
import browser$prefer_query_selector from './rules/browser/prefer-query-selector'
import browser$prefer_text_content from './rules/browser/prefer-text-content'
import jsx$no_class_component from './rules/jsx/no-class-component'
import jsx$no_logical from './rules/jsx/no-logical'
import jsx$no_set_html from './rules/jsx/no-set-html'
import jsx$no_template_literal from './rules/jsx/no-template-literal'
import jsx$prefer_test_id from './rules/jsx/prefer-test-id'
import string$no_interpolation from './rules/string/no-interpolation'
import string$no_locale_case from './rules/string/no-locale-case'
import string$no_simple_template_literal from './rules/string/no-simple-template-literal'
import string$no_unneeded_to_string from './rules/string/no-unneeded-to-string'
import type$no_bigint from './rules/type/no-bigint'
import type$no_force_cast_via_top_type from './rules/type/no-force-cast-via-top-type'
import type$no_instanceof_wrapper from './rules/type/no-instanceof-wrapper'
import type$no_number_constructor from './rules/type/no-number-constructor'
import type$no_wrapper_type_reference from './rules/type/no-wrapper-type-reference'
import type$prefer_return_type_annotation from './rules/type/prefer-return-type-annotation'
import unicode$no_bidi from './rules/unicode/no-bidi'
import unicode$no_invisible from './rules/unicode/no-invisible'
import unicode$specific_set from './rules/unicode/specific-set'
import ban_eslint_disable from './rules/ban-eslint-disable'
import no_builtin_base64 from './rules/no-builtin-base64'
import no_default_error from './rules/no-default-error'
import no_redundant_variable from './rules/no-redundant-variable'
import no_single_return from './rules/no-single-return'
import no_then from './rules/no-then'
import no_timer from './rules/no-timer'
import no_top_level from './rules/no-top-level'
import no_unsafe_date from './rules/no-unsafe-date'
import no_vue from './rules/no-vue'
import prefer_default_export from './rules/prefer-default-export'
import prefer_early_return from './rules/prefer-early-return'
import prefer_fetch from './rules/prefer-fetch'
import prefer_timer_id from './rules/prefer-timer-id'
export const rules = {
  'array/no-implicit-sort': array$no_implicit_sort,
  'array/no-unneeded-flat-map': array$no_unneeded_flat_map,
  'array/prefer-from': array$prefer_from,
  'browser/no-set-html': browser$no_set_html,
  'browser/prefer-dataset': browser$prefer_dataset,
  'browser/prefer-event-target': browser$prefer_event_target,
  'browser/prefer-keyboard-event-key': browser$prefer_keyboard_event_key,
  'browser/prefer-location-assign': browser$prefer_location_assign,
  'browser/prefer-modern-dom-apis': browser$prefer_modern_dom_apis,
  'browser/prefer-query-selector': browser$prefer_query_selector,
  'browser/prefer-text-content': browser$prefer_text_content,
  'jsx/no-class-component': jsx$no_class_component,
  'jsx/no-logical': jsx$no_logical,
  'jsx/no-set-html': jsx$no_set_html,
  'jsx/no-template-literal': jsx$no_template_literal,
  'jsx/prefer-test-id': jsx$prefer_test_id,
  'string/no-interpolation': string$no_interpolation,
  'string/no-locale-case': string$no_locale_case,
  'string/no-simple-template-literal': string$no_simple_template_literal,
  'string/no-unneeded-to-string': string$no_unneeded_to_string,
  'type/no-bigint': type$no_bigint,
  'type/no-force-cast-via-top-type': type$no_force_cast_via_top_type,
  'type/no-instanceof-wrapper': type$no_instanceof_wrapper,
  'type/no-number-constructor': type$no_number_constructor,
  'type/no-wrapper-type-reference': type$no_wrapper_type_reference,
  'type/prefer-return-type-annotation': type$prefer_return_type_annotation,
  'unicode/no-bidi': unicode$no_bidi,
  'unicode/no-invisible': unicode$no_invisible,
  'unicode/specific-set': unicode$specific_set,
  'ban-eslint-disable': ban_eslint_disable,
  'no-builtin-base64': no_builtin_base64,
  'no-default-error': no_default_error,
  'no-redundant-variable': no_redundant_variable,
  'no-single-return': no_single_return,
  'no-then': no_then,
  'no-timer': no_timer,
  'no-top-level': no_top_level,
  'no-unsafe-date': no_unsafe_date,
  'no-vue': no_vue,
  'prefer-default-export': prefer_default_export,
  'prefer-early-return': prefer_early_return,
  'prefer-fetch': prefer_fetch,
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

// This file is auto generated.
// 39 Rules
// 5  Configs
import array$no_unneeded_flat_map from './rules/array/no-unneeded-flat-map.ts'
import array$prefer_from from './rules/array/prefer-from.ts'
import browser$no_persistent_storage from './rules/browser/no-persistent-storage.ts'
import browser$no_set_html from './rules/browser/no-set-html.ts'
import browser$prefer_location_assign from './rules/browser/prefer-location-assign.ts'
import jsx$no_class_component from './rules/jsx/no-class-component.ts'
import jsx$no_logical from './rules/jsx/no-logical.ts'
import jsx$no_set_html from './rules/jsx/no-set-html.ts'
import jsx$no_template_literal from './rules/jsx/no-template-literal.ts'
import jsx$no_unneeded_nested from './rules/jsx/no-unneeded-nested.ts'
import jsx$prefer_test_id from './rules/jsx/prefer-test-id.ts'
import string$no_data_url from './rules/string/no-data-url.ts'
import string$no_interpolation from './rules/string/no-interpolation.ts'
import string$no_locale_case from './rules/string/no-locale-case.ts'
import string$no_simple_template_literal from './rules/string/no-simple-template-literal.ts'
import string$no_unneeded_to_string from './rules/string/no-unneeded-to-string.ts'
import type$no_const_enum from './rules/type/no-const-enum.ts'
import type$no_empty_literal from './rules/type/no-empty-literal.ts'
import type$no_force_cast_via_top_type from './rules/type/no-force-cast-via-top-type.ts'
import type$no_number_constructor from './rules/type/no-number-constructor.ts'
import type$no_wrapper_type_reference from './rules/type/no-wrapper-type-reference.ts'
import type$prefer_return_type_annotation from './rules/type/prefer-return-type-annotation.ts'
import unicode$no_bidi from './rules/unicode/no-bidi.ts'
import unicode$no_invisible from './rules/unicode/no-invisible.ts'
import unicode$specific_set from './rules/unicode/specific-set.ts'
import no_builtin_base64 from './rules/no-builtin-base64.ts'
import no_default_error from './rules/no-default-error.ts'
import no_for_in from './rules/no-for-in.ts'
import no_redundant_variable from './rules/no-redundant-variable.ts'
import no_single_return from './rules/no-single-return.ts'
import no_then from './rules/no-then.ts'
import no_timer from './rules/no-timer.ts'
import no_top_level from './rules/no-top-level.ts'
import no_unsafe_date from './rules/no-unsafe-date.ts'
import prefer_default_export from './rules/prefer-default-export.ts'
import prefer_defer_import from './rules/prefer-defer-import.ts'
import prefer_early_return from './rules/prefer-early-return.ts'
import prefer_fetch from './rules/prefer-fetch.ts'
import prefer_timer_id from './rules/prefer-timer-id.ts'
export const rules: unknown = {
  'array-no-unneeded-flat-map': array$no_unneeded_flat_map,
  'array-prefer-from': array$prefer_from,
  'browser-no-persistent-storage': browser$no_persistent_storage,
  'browser-no-set-html': browser$no_set_html,
  'browser-prefer-location-assign': browser$prefer_location_assign,
  'jsx-no-class-component': jsx$no_class_component,
  'jsx-no-logical': jsx$no_logical,
  'jsx-no-set-html': jsx$no_set_html,
  'jsx-no-template-literal': jsx$no_template_literal,
  'jsx-no-unneeded-nested': jsx$no_unneeded_nested,
  'jsx-prefer-test-id': jsx$prefer_test_id,
  'string-no-data-url': string$no_data_url,
  'string-no-interpolation': string$no_interpolation,
  'string-no-locale-case': string$no_locale_case,
  'string-no-simple-template-literal': string$no_simple_template_literal,
  'string-no-unneeded-to-string': string$no_unneeded_to_string,
  'type-no-const-enum': type$no_const_enum,
  'type-no-empty-literal': type$no_empty_literal,
  'type-no-force-cast-via-top-type': type$no_force_cast_via_top_type,
  'type-no-number-constructor': type$no_number_constructor,
  'type-no-wrapper-type-reference': type$no_wrapper_type_reference,
  'type-prefer-return-type-annotation': type$prefer_return_type_annotation,
  'unicode-no-bidi': unicode$no_bidi,
  'unicode-no-invisible': unicode$no_invisible,
  'unicode-specific-set': unicode$specific_set,
  'no-builtin-base64': no_builtin_base64,
  'no-default-error': no_default_error,
  'no-for-in': no_for_in,
  'no-redundant-variable': no_redundant_variable,
  'no-single-return': no_single_return,
  'no-then': no_then,
  'no-timer': no_timer,
  'no-top-level': no_top_level,
  'no-unsafe-date': no_unsafe_date,
  'prefer-default-export': prefer_default_export,
  'prefer-defer-import': prefer_defer_import,
  'prefer-early-return': prefer_early_return,
  'prefer-fetch': prefer_fetch,
  'prefer-timer-id': prefer_timer_id,
} as const
import all from './configs/all.json' with { type: 'json' }
import base from './configs/base.json' with { type: 'json' }
import fixable from './configs/fixable.json' with { type: 'json' }
import recommended from './configs/recommended.json' with { type: 'json' }
import recommended_requires_type_checking from './configs/recommended-requires-type-checking.json' with { type: 'json' }
export const configs: unknown = {
  all,
  base,
  fixable,
  recommended,
  'recommended-requires-type-checking': recommended_requires_type_checking,
} as const
export * as default from './index.ts'

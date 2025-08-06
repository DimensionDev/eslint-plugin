// @ts-check
import eslint from '@eslint/js'
import tslint from 'typescript-eslint'
import plugin from 'eslint-plugin-eslint-plugin'

export default tslint.config(
  {
    ignores: ['lib'],
  },
  //
  eslint.configs.recommended,
  tslint.configs.recommended,
  plugin.configs.recommended,
  {
    rules: {
      'eslint-plugin/require-meta-schema-description': 'off',
      'eslint-plugin/require-meta-default-options': 'off',
    },
  },
)

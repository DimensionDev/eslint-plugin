// @ts-check
import eslint from '@eslint/js'
import tslint from 'typescript-eslint'
import plugin from 'eslint-plugin-eslint-plugin'

export default tslint.config(
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  plugin.configs['flat/recommended'],
)

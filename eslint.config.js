// @ts-check
import eslint from '@eslint/js'
import tslint from 'typescript-eslint'
import plugin from 'eslint-plugin-eslint-plugin'
import { defineConfig } from 'eslint/config'

export default defineConfig(
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
      '@/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@typescript-eslint/*', 'qwq'],
              allowTypeImports: true,
            },
          ],
        },
      ],
    },
    ignores: ['**/*.spec.ts', 'src/spec.ts'],
  },
)
// aa

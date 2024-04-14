/* eslint-disable @typescript-eslint/no-restricted-imports */
/* eslint-disable unicorn/prefer-module */
import path from 'node:path'
import { RuleTester } from '@typescript-eslint/utils/ts-eslint'
import type { InvalidTestCase, RuleListener, ValidTestCase } from '@typescript-eslint/utils/ts-eslint'
import { it } from 'vitest'
import type { ExportedRuleModule } from './rule.js'

import tsEsLintParser from '@typescript-eslint/parser'

const tester = new RuleTester({
  languageOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    parser: tsEsLintParser,
    parserOptions: {
      tsconfigRootDir: path.join(__dirname, '..', 'tests', 'fixtures'),
      project: true,
      ecmaFeatures: { jsx: true },
    }
  }
} as any)
// TODO: remove this any once ts-eslint v7 has implemented type for the ESLint v9 FlatRuleTester
// https://github.com/typescript-eslint/typescript-eslint/issues/8211

type TestCaseGenerator<T, R = T> = (cast: (input: T) => T) => Generator<R>

interface RunOptions<TOptions extends readonly unknown[], TMessageIds extends string> {
  module: ExportedRuleModule<TOptions, TMessageIds, RuleListener>
  valid?: TestCaseGenerator<ValidTestCase<TOptions>, string | ValidTestCase<TOptions>>
  invalid: TestCaseGenerator<InvalidTestCase<TMessageIds, TOptions>>
}

export async function runTest<TOptions extends readonly unknown[], TMessageIds extends string>(
  options: RunOptions<TOptions, TMessageIds>,
) {
  const { module, valid, invalid } = options
  it(module.name, () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tester.run(module.name, module as any, {
      valid: [...(valid?.(identifier) ?? [])].flat(),
      invalid: [...(invalid(identifier) ?? [])].flat(),
    })
  })
}

function identifier<T>(input: T): T {
  return input
}

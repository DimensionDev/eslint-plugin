/* eslint-disable unicorn/prefer-module */
import path from 'node:path'
import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint'
import type { InvalidTestCase, RuleListener, ValidTestCase } from '@typescript-eslint/utils/dist/ts-eslint'
import type { ExportedRuleModule } from './rule'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    tsconfigRootDir: path.join(__dirname, '..', 'tests', 'fixtures'),
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
  },
})

interface RunOptions<TOptions extends readonly unknown[], TMessageIds extends string> {
  module: ExportedRuleModule<TOptions, TMessageIds, RuleListener>
  valid?(): Generator<string | ValidTestCase<TOptions>>
  invalid(): Generator<InvalidTestCase<TMessageIds, TOptions>>
}

export async function runTest<TOptions extends readonly unknown[], TMessageIds extends string>(
  options: RunOptions<TOptions, TMessageIds>
) {
  const { module, valid, invalid } = options
  tester.run(module.name, module, {
    valid: [...(valid?.() ?? [])].flat(),
    invalid: [...(invalid?.() ?? [])].flat(),
  })
}

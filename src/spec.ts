import { RuleTester } from '@typescript-eslint/rule-tester'
import type { RunTests } from '@typescript-eslint/rule-tester'
import globals from 'globals'
import tsEsLintParser from '@typescript-eslint/parser'
import type { RuleModuleWithName } from './rule.ts'
import * as vitest from 'vitest'
import { fileURLToPath } from 'node:url'

RuleTester.afterAll = vitest.afterAll
RuleTester.it = vitest.it
RuleTester.itOnly = vitest.it.only
RuleTester.describe = vitest.describe

class OurRuleTester extends RuleTester {
  test<MessageIds extends string, Options extends readonly unknown[]>(
    module: RuleModuleWithName<MessageIds, Options>,
    test: Partial<RunTests<MessageIds, Options>>,
  ) {
    return this.run(module.name.includes('/') ? module.name.split('/').at(-1)! : module.name, module, {
      valid: test.valid || [],
      invalid: test.invalid || [],
    })
  }
}
export const tester = new OurRuleTester({
  languageOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    parser: tsEsLintParser,
    globals: globals.browser,
    parserOptions: {
      ecmaFeatures: { jsx: true },
      projectService: {
        allowDefaultProject: ['*.ts*'],
      },
      tsconfigRootDir: fileURLToPath(new URL('../', import.meta.url)),
    },
  },
})

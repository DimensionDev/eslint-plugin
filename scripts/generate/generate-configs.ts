import fs from 'node:fs/promises'
import path from 'node:path'
import type { Linter } from '@typescript-eslint/utils/dist/ts-eslint'
import type { ExportedRuleModule } from '../../src/rule'
import { format, getRuleName, CONFIG_PATH } from './utils'

const baseConfig: Linter.Config = {
  $schema: '../schema.json',
  plugins: ['@dimensiondev'],
}

export const configs: Record<string, (modules: ExportedRuleModule[]) => Linter.Config> = {
  'base'() {
    return baseConfig
  },
  'all'(modules) {
    return {
      ...baseConfig,
      rules: filterRules(modules, ({ meta }) => {
        if (meta.deprecated) return 'off'
        return meta.docs?.recommended ? meta.docs?.recommended : 'off'
      }),
    }
  },
  'fixable'(modules) {
    return {
      ...baseConfig,
      rules: filterRules(modules, ({ meta }) => {
        if (meta.deprecated) return
        if (!(meta.fixable || meta.hasSuggestions)) return
        return meta.docs?.recommended
      }),
    }
  },
  'recommended'(modules) {
    return {
      ...baseConfig,
      rules: filterRules(modules, ({ meta }) => {
        if (meta.deprecated) return
        if (meta.docs?.requiresTypeChecking) return
        return meta.docs?.recommended
      }),
    }
  },
  'recommended-requires-type-checking'(modules) {
    return {
      ...baseConfig,
      rules: filterRules(modules, ({ meta }) => {
        if (meta.deprecated) return
        if (!meta.docs?.requiresTypeChecking) return
        return meta.docs?.recommended
      }),
    }
  },
}

export function getConfigNames() {
  const names = Object.keys(configs)
  names.sort((a, b) => a.localeCompare(b, 'en-US', { numeric: true }))
  return names
}

export async function generateConfigs(modules: ExportedRuleModule[]) {
  await fs.rm(CONFIG_PATH, { recursive: true })
  await fs.mkdir(CONFIG_PATH)
  for (const name of Object.keys(configs)) {
    await storeConfig(`${name}.json`, configs[name](modules))
  }
}

async function storeConfig(name: string, config: Linter.Config) {
  const formatted = await format(JSON.stringify(config, null, 2), 'json')
  await fs.writeFile(path.join(CONFIG_PATH, name), formatted, 'utf8')
}

function filterRules(
  modules: ExportedRuleModule[],
  // eslint-disable-next-line unicorn/prefer-module
  onEntry: (module: ExportedRuleModule) => Linter.RuleEntry | false | undefined
): Record<string, Linter.RuleEntry> {
  const rules: [string, Linter.RuleEntry][] = []
  for (const rule of modules) {
    if (rule.meta.hidden) continue
    const entry = onEntry(rule)
    if (entry === undefined || entry === false) continue
    const extendsBaseRule = rule.meta.docs?.extendsBaseRule ?? false
    if (extendsBaseRule === true) {
      rules.push([rule.name, 'off'])
    } else if (typeof extendsBaseRule === 'string') {
      rules.push([extendsBaseRule, 'off'])
    }
    for (const replacedRule of rule.meta.replacedBy ?? []) {
      rules.push([replacedRule, 'off'])
    }
    rules.push([getRuleName(rule.name), entry])
  }
  return Object.fromEntries(rules)
}

import fs from 'node:fs/promises'
import type { Linter } from '@typescript-eslint/utils/ts-eslint'
import type { RuleModuleWithNameDefault } from '../src/rule.ts'
import { format, getRuleName, CONFIG_PATH } from './utils.ts'

const baseConfig: Linter.ConfigType = {
  $schema: '../schema.json',
  plugins: ['@masknet'],
}

export const configs: Record<string, (modules: RuleModuleWithNameDefault[]) => Linter.ConfigType> = {
  'base'() {
    return baseConfig
  },
  'all'(modules) {
    return {
      ...baseConfig,
      rules: filterRules(modules, ({ meta }): Linter.RuleEntry | undefined => {
        if (meta.deprecated) return
        if (meta.docs?.recommended) {
          switch (meta.docs?.recommended) {
            case 'recommended': {
              return 'error'
            }
            case 'strict': {
              return 'error'
            }
            case 'stylistic': {
              return 'warn'
            }
            // No default
          }
        } else {
          return 'error'
        }
      }),
    }
  },
  'fixable'(modules) {
    return {
      ...baseConfig,
      rules: filterRules(modules, ({ meta }): Linter.RuleEntry | undefined => {
        if (meta.deprecated) return
        if (!meta.fixable && !meta.hasSuggestions) return
        if (meta.docs?.recommended) {
          switch (meta.docs?.recommended) {
            case 'recommended': {
              return 'error'
            }
            case 'strict': {
              return
            }
            case 'stylistic': {
              return
            }
            // No default
          }
        } else {
          return 'error'
        }
      }),
    }
  },
  'recommended'(modules) {
    return {
      ...baseConfig,
      rules: filterRules(modules, ({ meta }): Linter.RuleEntry | undefined => {
        if (meta.deprecated) return
        if (meta.docs?.requiresTypeChecking) return
        if (meta.docs?.recommended) {
          switch (meta.docs?.recommended) {
            case 'recommended': {
              return 'error'
            }
            case 'strict': {
              return
            }
            case 'stylistic': {
              return
            }
            // No default
          }
        } else {
          return 'error'
        }
      }),
    }
  },
  'recommended-requires-type-checking'(modules) {
    return {
      ...baseConfig,
      rules: filterRules(modules, ({ meta }): Linter.RuleEntry | undefined => {
        if (meta.deprecated) return
        if (!meta.docs?.requiresTypeChecking) return
        if (meta.docs?.recommended) {
          switch (meta.docs?.recommended) {
            case 'recommended': {
              return 'error'
            }
            case 'strict': {
              return
            }
            case 'stylistic': {
              return
            }
            // No default
          }
        } else {
          return 'error'
        }
      }),
    }
  },
}

export function getConfigNames() {
  const names = Object.keys(configs)
  names.sort((a, b) => a.localeCompare(b, 'en-US', { numeric: true }))
  return names
}

export async function generateConfigs(modules: RuleModuleWithNameDefault[]) {
  await fs.rm(CONFIG_PATH, { recursive: true })
  await fs.mkdir(CONFIG_PATH)
  for (const name of Object.keys(configs)) {
    await storeConfig(`${name}.json`, configs[name](modules))
  }
}

async function storeConfig(name: string, config: Linter.ConfigType) {
  const formatted = await format(JSON.stringify(config, null, 2), 'json')
  await fs.writeFile(new URL(name, CONFIG_PATH), formatted, 'utf8')
}

function filterRules(
  modules: RuleModuleWithNameDefault[],
  onEntry: (module: RuleModuleWithNameDefault) => Linter.RuleEntry | false | undefined,
): Record<string, Linter.RuleEntry> {
  const rules: [string, Linter.RuleEntry][] = []
  for (const rule of modules) {
    const entry = onEntry(rule)
    if (entry === undefined || entry === false || rule.meta.deprecated) {
      continue
    }
    rules.push([getRuleName(rule.name), entry])
  }
  return Object.fromEntries(rules)
}

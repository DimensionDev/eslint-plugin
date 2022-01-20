import fs from 'node:fs/promises'
import path from 'node:path'
import type { Linter } from '@typescript-eslint/utils/dist/ts-eslint'
import type { JSONSchema4 } from '@typescript-eslint/utils/dist/json-schema'
import type { ExportedRuleModule } from '../../src/rule'
import { format, getRuleName, CONFIG_PATH, SOURCE_PATH } from './utils'

const baseConfig: Linter.Config = {
  $schema: '../schema.json',
  plugins: ['@dimensiondev'],
}

export async function generateConfigMetadata(modules: ExportedRuleModule[]) {
  await fs.rm(CONFIG_PATH, { recursive: true })
  await fs.mkdir(CONFIG_PATH)
  await makeSchema(modules)
  await storeConfig('base.json', baseConfig)
  await storeConfig('all.json', {
    ...baseConfig,
    rules: filterRules(modules, ({ meta }) => {
      if (meta.deprecated) return 'off'
      return meta.docs?.recommended ? meta.docs?.recommended : 'off'
    }),
  })
  await storeConfig('fixable.json', {
    ...baseConfig,
    rules: filterRules(modules, ({ meta }) => {
      if (meta.deprecated) return
      if (!(meta.fixable || meta.hasSuggestions)) return
      return meta.docs?.recommended
    }),
  })
  await storeConfig('recommended.json', {
    ...baseConfig,
    rules: filterRules(modules, ({ meta }) => {
      if (meta.deprecated) return
      if (meta.docs?.requiresTypeChecking) return
      return meta.docs?.recommended
    }),
  })
  await storeConfig('recommended-requires-type-checking.json', {
    ...baseConfig,
    rules: filterRules(modules, ({ meta }) => {
      if (meta.deprecated) return
      if (!meta.docs?.requiresTypeChecking) return
      return meta.docs?.recommended
    }),
  })
}

async function makeSchema(modules: ExportedRuleModule[]) {
  const rules = modules.map(({ name, meta }): [string, JSONSchema4] => {
    const { schema, docs } = meta
    const description = docs?.description
    const rule: JSONSchema4 = { $ref: '#/definitions/rule' }
    const schemaOptions: JSONSchema4[] = Array.isArray(schema) ? schema : [schema]
    const oneOf: JSONSchema4[] = [rule, { type: 'array', items: [rule, ...schemaOptions], minItems: 2 }]
    return [getRuleName(name), schemaOptions.length > 0 ? { description, oneOf } : { description, ...rule }]
  })
  const schema: JSONSchema4 = {
    $schema: 'http://json-schema.org/draft-04/schema',
    allOf: [{ $ref: 'https://json.schemastore.org/eslintrc.json' }],
    properties: {
      rules: { $ref: '#/definitions/user-defined-rules' },
      overrides: {
        type: 'array',
        items: {
          type: 'object',
          properties: { rules: { $ref: '#/definitions/user-defined-rules' } },
        },
      },
    },
    definitions: {
      'rule': { enum: ['off', 'warn', 'error'] },
      'user-defined-rules': {
        type: 'object',
        properties: Object.fromEntries(rules),
      },
    },
  }
  const formatted = await format(JSON.stringify(schema), 'json')
  await fs.writeFile(path.join(SOURCE_PATH, 'schema.json'), formatted, 'utf-8')
}

async function storeConfig(name: string, config: Linter.Config) {
  const formatted = await format(JSON.stringify(config, null, 2), 'json')
  await fs.writeFile(path.join(CONFIG_PATH, name), formatted, 'utf-8')
}

function filterRules(
  modules: ExportedRuleModule[],
  // eslint-disable-next-line unicorn/prefer-module
  onEntry: (module: ExportedRuleModule) => Linter.RuleEntry | false | undefined
): Record<string, Linter.RuleEntry> {
  const rules: [string, Linter.RuleEntry][] = []
  for (const rule of modules) {
    const entry = onEntry(rule)
    if (entry === undefined || entry === false) continue
    rules.push([getRuleName(rule.name), entry])
  }
  return Object.fromEntries(rules)
}

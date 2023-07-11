import fs from 'node:fs/promises'
import type { JSONSchema4 } from '@typescript-eslint/utils/json-schema'
import type { ExportedRuleModule } from '../../rule.js'
import { format, getRuleName, SOURCE_PATH } from './utils.js'

export async function generateSchema(modules: ExportedRuleModule[], configNames: string[]) {
  const rules = modules.map(({ name, meta }): [string, JSONSchema4] => {
    const { schema, docs } = meta
    const rule: JSONSchema4 = { $ref: '#/definitions/rule' }
    const schemaOptions: JSONSchema4[] = Array.isArray(schema) ? schema : [schema]
    const oneOf: JSONSchema4[] = [rule, { type: 'array', items: [rule, ...schemaOptions], minItems: 2 }]
    const description = `${docs?.description ?? ''}\n${docs?.url ?? ''}`.trim()
    return [getRuleName(name), schemaOptions.length > 0 ? { description, oneOf } : { description, ...rule }]
  })
  const schema: JSONSchema4 = {
    $schema: 'http://json-schema.org/draft-04/schema',
    allOf: [{ $ref: 'https://json.schemastore.org/eslintrc.json' }],
    properties: {
      rules: { $ref: '#/definitions/user-defined-rules' },
      plugins: {
        type: 'array' as const,
        items: {
          anyOf: [{ type: 'string' as const }],
        },
        uniqueItems: true,
      },
      extends: {
        oneOf: [
          { $ref: '#/definitions/preset-configs' },
          { type: 'array' as const, items: { $ref: '#/definitions/preset-configs' }, uniqueItems: true },
        ],
      },
      overrides: {
        type: 'array' as const,
        items: {
          type: 'object' as const,
          properties: { rules: { $ref: '#/definitions/user-defined-rules' } },
        },
      },
    },
    definitions: {
      'rule': { type: 'string', enum: ['off', 'warn', 'error'] },
      'preset-configs': {
        anyOf: [{ type: 'string' }, { type: 'string', enum: configNames.map((name) => `plugin:${getRuleName(name)}`) }],
      },
      'user-defined-rules': {
        type: 'object',
        properties: Object.fromEntries(rules),
      },
    },
  }
  const formatted = await format(JSON.stringify(schema), 'json')
  await fs.writeFile(new URL('schema.json', SOURCE_PATH), formatted, 'utf8')
}

import fs from 'node:fs/promises'
import path from 'node:path'
import type { JSONSchema4 } from '@typescript-eslint/utils/dist/json-schema'
import type { ExportedRuleModule } from '../../src/rule'
import { format, getRuleName, PACKAGE_NAME, SOURCE_PATH } from './utils'

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
        type: 'array',
        items: {
          anyOf: [{ type: 'string' }, { const: PACKAGE_NAME }],
        },
        uniqueItems: true,
      },
      extends: {
        oneOf: [
          { $ref: '#/definitions/preset-configs' },
          { type: 'array', items: { $ref: '#/definitions/preset-configs' }, uniqueItems: true },
        ],
      },
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
      'preset-configs': {
        anyOf: [{ type: 'string' }, { enum: configNames.map((name) => `plugin:${getRuleName(name)}`) }],
      },
      'user-defined-rules': {
        type: 'object',
        properties: Object.fromEntries(rules),
      },
    },
  }
  const formatted = await format(JSON.stringify(schema), 'json')
  await fs.writeFile(path.join(SOURCE_PATH, 'schema.json'), formatted, 'utf-8')
}

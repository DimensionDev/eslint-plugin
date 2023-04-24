import fs from 'node:fs/promises'
import type { Linter } from '@typescript-eslint/utils/dist/ts-eslint'
import { dedent } from 'ts-dedent'
import type { ExportedRuleModule } from '../../rule.js'
import { configs } from './generate-configs.js'
import { format, replace, ROOT_PATH, toReference } from './utils.js'

export async function generateREADME(modules: ExportedRuleModule[]) {
  const filePath = new URL('README.md', ROOT_PATH)
  let content = await fs.readFile(filePath, 'utf8')
  modules = modules.filter(({ meta }) => meta.hidden !== true)
  content = replace(content, 'example configure', makeExampleConfigure(modules))
  content = replace(content, 'rule list', makeRuleList(modules))
  const formatted = await format(content, 'markdown')
  await fs.writeFile(filePath, formatted, 'utf8')
}

function makeExampleConfigure(modules: ExportedRuleModule[]) {
  const config: Linter.Config = configs.all(modules)
  config.$schema = 'https://dimensiondev.github.io/eslint-plugin/src/schema.json'
  return '```json\n' + JSON.stringify(config) + '\n```'
}

function makeRuleList(modules: ExportedRuleModule[]) {
  const makeRow = ({ name, meta }: ExportedRuleModule) => {
    const flags = toEmojiSymbols({
      ':white_check_mark:': meta.docs?.recommended,
      ':wrench:': meta.fixable,
      ':bulb:': meta.hasSuggestions,
      ':gear:': meta.schema.length > 0,
      ':thought_balloon:': meta.docs?.requiresTypeChecking,
    })
    return dedent`
      - [${name}][${toReference(name)}] ${flags}\\
        ${meta.docs?.description}
    `
  }
  const makeLink = ({ name, meta }: ExportedRuleModule) => {
    return `[${toReference(name)}]: ${meta.docs?.url}`
  }
  const lines = [...modules.map(makeRow), '', ...modules.map(makeLink)]
  return lines.join('\n')
}

function toEmojiSymbols(table: Record<string, unknown>) {
  return Object.keys(table)
    .filter((name) => table[name])
    .join(' ')
}

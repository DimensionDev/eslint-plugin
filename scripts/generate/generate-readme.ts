import path from 'node:path'
import fs from 'node:fs/promises'
import { dedent } from 'ts-dedent'
import type { Linter } from '@typescript-eslint/utils/dist/ts-eslint'
import type { ExportedRuleModule } from '../../src/rule'
import { format } from './format'
import { CONFIG_PATH, ROOT_PATH } from './paths'

export async function generateREADME(modules: ExportedRuleModule[]) {
  const filePath = path.join(ROOT_PATH, 'README.md')
  let content = await fs.readFile(filePath, 'utf-8')
  content = replace(content, 'example configure', await makeExampleConfigure())
  content = replace(content, 'rule list', makeRuleList(modules))
  const formatted = await format(content, 'markdown')
  await fs.writeFile(filePath, formatted, 'utf-8')
}

function replace(content: string, name: string, replaced: string) {
  const pattern = new RegExp(`(<!-- begin ${name} -->)(.+)(<!-- end ${name} -->)`, 'gs')
  return content.replace(pattern, `$1\n\n${replaced}\n\n$3`)
}

async function makeExampleConfigure() {
  const content = await fs.readFile(path.join(CONFIG_PATH, 'all.json'))
  const config: Linter.Config = JSON.parse(content.toString('utf-8'))
  config.$schema = 'https://dimensiondev.github.io/eslint-plugin/src/schema.json'
  return '```json\n' + JSON.stringify(config) + '\n```'
}

function makeRuleList(modules: ExportedRuleModule[]) {
  const makeRow = ({ name, meta }: ExportedRuleModule) => {
    const flags = {
      ':white_check_mark:': meta.docs?.recommended,
      ':wrench:': meta.fixable,
      ':bulb:': meta.hasSuggestions,
      ':gear:': meta.schema.length > 0,
      ':thought_balloon:': meta.docs?.requiresTypeChecking,
    }
    return dedent`
      - [${name}][${name.replaceAll('-', '_')}] ${toEmojiSymbols(flags)}\\
        ${meta.docs?.description}
    `
  }
  const makeLink = ({ name, meta }: ExportedRuleModule) => {
    return `[${name.replaceAll('-', '_')}]: ${meta.docs?.url}`
  }
  const lines = [...modules.map(makeRow), '', ...modules.map(makeLink)]
  return lines.join('\n')
}

function toEmojiSymbols(table: Record<string, unknown>) {
  const symbols: string[] = []
  for (const [name, value] of Object.entries(table)) {
    if (value) {
      symbols.push(name)
    }
  }
  return symbols.join(' ')
}

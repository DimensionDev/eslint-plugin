#!npx ts-node
/* eslint-disable no-console */
import { generateConfigs, getConfigNames } from './generate-configs'
import { generateIndex } from './generate-index'
import { generateREADME } from './generate-readme'
import { generateRuleDetails } from './generate-rule-details'
import { generateSchema } from './generate-schema'
import { getRuleModules } from './utils'

async function main() {
  const rules = await time('load rules', getRuleModules)
  const configNames = getConfigNames()
  console.log('rules', rules.length)
  console.log('configs', configNames.length)
  await time('generate configs', () => generateConfigs(rules))
  await time('generate schema', () => generateSchema(rules, configNames))
  await time('generate index', () => generateIndex(rules, configNames))
  await time('generate readme', () => generateREADME(rules))
  await time('generate details', () => generateRuleDetails(rules))
}

async function time<T>(name: string, callback: () => Promise<T>) {
  console.time(name)
  const result = await callback()
  console.timeEnd(name)
  return result
}

main().catch(console.error)

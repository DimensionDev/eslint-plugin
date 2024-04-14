#!npx ts-node
import { generateConfigs, getConfigNames } from './generate-configs.js'
import { generateIndex } from './generate-index.js'
import { generateREADME } from './generate-readme.js'
import { generateRuleDetails } from './generate-rule-details.js'
import { generateSchema } from './generate-schema.js'
import { getRuleModules } from './utils.js'

const rules = await time('load rules', getRuleModules)
const configNames = getConfigNames()
console.log('rules', rules.length)
console.log('configs', configNames.length)
await time('generate configs', () => generateConfigs(rules))
await time('generate schema', () => generateSchema(rules, configNames))
await time('generate index', () => generateIndex(rules, configNames))
await time('generate readme', () => generateREADME(rules))
await time('generate details', () => generateRuleDetails(rules))

async function time<T>(name: string, callback: () => Promise<T>) {
  console.time(name)
  const result = await callback()
  console.timeEnd(name)
  return result
}

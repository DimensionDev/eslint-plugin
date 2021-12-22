#!npx ts-node
/* eslint-disable no-console */
import { getRuleModules } from './utils'
import { generateConfigMetadata } from './generate-configs'
import { generateRuleDetails } from './generate-rule-details'
import { generateIndex } from './generate-index'
import { generateREADME } from './generate-readme'

async function main() {
  const modules = await time('load rules', getRuleModules)
  console.log('module', modules.length, 'count')
  await time('generate configs', () => generateConfigMetadata(modules))
  await time('generate details', () => generateRuleDetails(modules))
  await time('generate readme', () => generateREADME(modules))
  await time('generate index', () => generateIndex(modules))
}

async function time<T>(name: string, callback: () => Promise<T>) {
  console.time(name)
  const result = await callback()
  console.timeEnd(name)
  return result
}

main().catch(console.error)

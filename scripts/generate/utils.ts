import fs from 'node:fs/promises'
import path from 'node:path'
import type { ExportedRuleModule } from '../../src/rule'
import { CONFIG_PATH, RULE_PATH } from './paths'

export async function getRuleModules() {
  const modules: ExportedRuleModule[] = []
  for await (const dirent of await fs.opendir(RULE_PATH)) {
    const { name, ext } = path.parse(dirent.name)
    if (ext !== '.ts' || name.endsWith('.spec')) continue
    const module = await import(path.join(RULE_PATH, dirent.name))
    modules.push(module.default ?? module)
  }
  modules.sort((a, b) => a.name.localeCompare(b.name, 'en-US', { numeric: true }))
  return modules
}

export async function getConfigNames() {
  let names = await fs.readdir(CONFIG_PATH)
  names = names.map((name) => path.parse(name).name)
  names.sort((a, b) => a.localeCompare(b, 'en-US', { numeric: true }))
  return names
}

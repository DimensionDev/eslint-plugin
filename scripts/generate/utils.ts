import { promisify } from 'node:util'
import path from 'node:path'
import { glob } from 'glob'
import prettier from 'prettier'
import type { ExportedRuleModule } from '../../src/rule'

const PREFIX = '@dimensiondev/'

// eslint-disable-next-line unicorn/prefer-module
export const ROOT_PATH = path.resolve(__dirname, '..', '..')
export const SOURCE_PATH = path.join(ROOT_PATH, 'src')
export const RULE_PATH = path.join(SOURCE_PATH, 'rules')
export const CONFIG_PATH = path.join(SOURCE_PATH, 'configs')

export function getRuleName(name: string) {
  if (name.startsWith(PREFIX)) return name
  return PREFIX + name
}

export function toReference(name: string) {
  return name.replaceAll('/', '$').replaceAll('-', '_')
}

export function replace(content: string, name: string, replaced: string) {
  const pattern = new RegExp(`(<!-- begin ${name} -->)(.+)(<!-- end ${name} -->)`, 'gs')
  return content.replace(pattern, `$1\n\n${replaced}\n\n$3`)
}

export async function getRuleModules() {
  const filePaths = await promisify(glob)(`${RULE_PATH}/**/*.ts`, { ignore: ['**/*.spec.ts'] })
  const modules: ExportedRuleModule[] = []
  for (const filePath of filePaths) {
    const module = await import(filePath)
    modules.push(module.default ?? module)
  }
  modules.sort((a, b) => {
    return a.name.localeCompare(b.name, 'en-US', { numeric: true })
  })
  return modules
}

export async function getConfigNames() {
  const filePaths = await promisify(glob)(`${CONFIG_PATH}/**/*.json`)
  const names = filePaths.map((filePath) => {
    const parsed = path.parse(path.relative(CONFIG_PATH, filePath))
    return path.join(parsed.dir, parsed.name)
  })
  names.sort((a, b) => a.localeCompare(b, 'en-US', { numeric: true }))
  return names
}

export async function format(source: string, parser: prettier.Config['parser']) {
  const config = await prettier.resolveConfig(ROOT_PATH, {
    editorconfig: true,
  })
  return prettier.format(source, { parser, ...config })
}

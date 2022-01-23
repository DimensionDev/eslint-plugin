import { promisify } from 'node:util'
import path from 'node:path'
import { glob } from 'glob'
import prettier from 'prettier'
import type { ExportedRuleModule } from '../../src/rule'

export const PACKAGE_NAME = '@dimensiondev'

// eslint-disable-next-line unicorn/prefer-module
export const ROOT_PATH = path.resolve(__dirname, '..', '..')
export const SOURCE_PATH = path.join(ROOT_PATH, 'src')
export const RULE_PATH = path.join(SOURCE_PATH, 'rules')
export const CONFIG_PATH = path.join(SOURCE_PATH, 'configs')

export function getRuleName(name: string) {
  if (name.startsWith(PACKAGE_NAME)) return name
  return `${PACKAGE_NAME}/${name}`
}

export function toReference(name: string) {
  return name.replaceAll('/', '$').replaceAll('-', '_')
}

export function replace(content: string, name: string, replaced: string) {
  const pattern = new RegExp(`(<!-- begin ${name} -->)(.+)(<!-- end ${name} -->)`, 'gs')
  return content.replace(pattern, `$1\n\n${replaced}\n\n$3`)
}

export async function getRuleModules() {
  const filePaths = await promisify(glob)('**/*.ts', {
    cwd: RULE_PATH,
    ignore: ['**/*.spec.ts'],
  })
  filePaths.sort((a, b) => a.localeCompare(b, 'en-US', { numeric: true }))
  const fileNames = [
    ...filePaths.filter((name) => name.includes('/')),
    ...filePaths.filter((name) => !name.includes('/')),
  ]
  return Promise.all(
    fileNames.map(async (filePath): Promise<ExportedRuleModule> => {
      const module: { default: ExportedRuleModule } = await import(path.join(RULE_PATH, filePath))
      if (filePath !== module.default.name + '.ts') {
        throw new Error(`Please check ${filePath} rule name`)
      }
      return module.default
    })
  )
}

export async function format(source: string, parser: prettier.Config['parser']) {
  const config = await prettier.resolveConfig(ROOT_PATH, {
    editorconfig: true,
  })
  return prettier.format(source, { parser, ...config })
}

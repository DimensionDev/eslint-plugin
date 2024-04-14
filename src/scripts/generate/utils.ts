import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import prettier from 'prettier'
import type { ExportedRuleModule } from '../../rule.js'

export const PACKAGE_NAME = '@masknet'

export const ROOT_PATH = new URL('../../../', import.meta.url)
export const SOURCE_PATH = new URL('src/', ROOT_PATH)
export const RULE_PATH = new URL('rules/', SOURCE_PATH)
export const CONFIG_PATH = new URL('configs/', ROOT_PATH)

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getRuleModules(): Promise<any> {
  const filePaths = await glob('**/*.ts', {
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
      const module: { default: ExportedRuleModule } = await import(new URL(filePath, RULE_PATH).href)
      if (filePath !== module.default.name + '.ts') {
        throw new Error(`Please check ${filePath} rule name`)
      }
      return module.default
    }),
  )
}

export async function format(source: string, parser: prettier.Config['parser']) {
  const config = await prettier.resolveConfig(fileURLToPath(ROOT_PATH), {
    editorconfig: true,
  })
  return prettier.format(source, { parser, ...config })
}

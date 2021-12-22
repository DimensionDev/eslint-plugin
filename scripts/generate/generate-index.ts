import fs from 'node:fs/promises'
import path from 'node:path'
import dedent from 'ts-dedent'
import ts, { factory } from 'typescript'
import type { ExportedRuleModule } from '../../src/rule'
import { format } from './format'
import { SOURCE_PATH } from './paths'
import { getConfigNames } from './utils'

export async function generateIndex(modules: ExportedRuleModule[]) {
  const configs = await getConfigNames()
  const moduleNames = modules.map(({ name }) => name)
  const source = await makeSourceFile(configs, moduleNames)
  const header = dedent`
    // ${modules.length.toString().padEnd(2, ' ')} Rules
    // ${configs.length.toString().padEnd(2, ' ')} Configs\n
  `
  const formatted = await format(header + source, 'typescript')
  await fs.writeFile(path.join(SOURCE_PATH, 'index.ts'), formatted, 'utf-8')
}

async function makeSourceFile(configs: string[], modules: string[]) {
  const statements = factory.createNodeArray([
    ...makeImports(modules, (name) => `./rules/${name}`),
    makeExportVariable('rules', makeObjectLiteral(modules)),
    ...makeImports(configs, (name) => `./configs/${name}.json`),
    makeExportVariable('configs', makeObjectLiteral(configs)),
  ])
  const source = factory.createSourceFile(
    statements,
    factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.JavaScriptFile
  )
  const printer = ts.createPrinter()
  return printer.printFile(source)
}

function makeExportVariable(name: string, expression: ts.Expression) {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(factory.createIdentifier(name), undefined, undefined, expression)],
      ts.NodeFlags.Const
    )
  )
}

function makeImports(names: string[], onFile: (name: string) => string) {
  return names.map((name) => createImportDeclaration(name, onFile))
}

function makeObjectLiteral(names: string[]) {
  return factory.createObjectLiteralExpression(names.map(createPropertyAssignment), true)
}

function createImportDeclaration(name: string, onFile: (name: string) => string) {
  return factory.createImportDeclaration(
    undefined,
    undefined,
    // eslint-disable-next-line unicorn/no-useless-undefined
    factory.createImportClause(false, toCamelCase(name), undefined),
    factory.createStringLiteral(onFile(name))
  )
}

function createPropertyAssignment(name: string) {
  if (/^\p{ID_Start}\p{ID_Continue}+$/u.test(name)) {
    return factory.createShorthandPropertyAssignment(name)
  }
  return factory.createPropertyAssignment(factory.createStringLiteral(name), toCamelCase(name))
}

function toCamelCase(name: string) {
  return factory.createIdentifier(name.replaceAll('-', '_'))
}

import fs from 'node:fs/promises'
import { dedent } from 'ts-dedent'
import ts from 'typescript'
import type { ExportedRuleModule } from '../../rule.js'
import { format, SOURCE_PATH, toReference } from './utils.js'

export async function generateIndex(modules: ExportedRuleModule[], configNames: string[]) {
  const moduleNames = modules.map(({ name }) => name)
  const source = await makeSourceFile(configNames, moduleNames)
  const header = dedent`
    // This file is auto generated.
    // ${moduleNames.length.toString().padEnd(2, ' ')} Rules
    // ${configNames.length.toString().padEnd(2, ' ')} Configs\n
  `
  const formatted = await format(header + source, 'typescript')
  await fs.writeFile(new URL('index.ts', SOURCE_PATH), formatted, 'utf8')
}

async function makeSourceFile(configs: string[], modules: string[]) {
  const statements = ts.factory.createNodeArray([
    ...makeImports(modules, (name) => `./rules/${name}.js`),
    makeExportVariable('rules', makeObjectLiteral(modules)),
    ...makeImports(configs, (name) => `./configs/${name}.json`),
    makeExportVariable('configs', makeObjectLiteral(configs)),
  ])
  const source = ts.factory.createSourceFile(
    statements,
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.JavaScriptFile
  )
  const printer = ts.createPrinter()
  return printer.printFile(source)
}

function makeExportVariable(name: string, expression: ts.Expression) {
  return ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          ts.factory.createIdentifier(name),
          undefined,
          ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
          expression
        ),
      ],
      ts.NodeFlags.Const
    )
  )
}

function makeImports(names: string[], onFile: (name: string) => string) {
  return names.map((name) => createImportDeclaration(name, onFile))
}

function makeObjectLiteral(names: string[]) {
  return ts.factory.createObjectLiteralExpression(names.map(createPropertyAssignment), true)
}

function createImportDeclaration(name: string, onFile: (name: string) => string) {
  const fileName = onFile(name)
  return ts.factory.createImportDeclaration(
    undefined,
    // eslint-disable-next-line unicorn/no-useless-undefined
    ts.factory.createImportClause(false, toCamelCase(name), undefined),
    ts.factory.createStringLiteral(fileName),
    fileName.endsWith('.json')
      ? ts.factory.createAssertClause(
          ts.factory.createNodeArray([
            ts.factory.createAssertEntry(ts.factory.createIdentifier('type'), ts.factory.createStringLiteral('json')),
          ])
        )
      : undefined
  )
}

function createPropertyAssignment(name: string) {
  if (/^\p{ID_Start}\p{ID_Continue}+$/u.test(name)) {
    return ts.factory.createShorthandPropertyAssignment(name)
  }
  return ts.factory.createPropertyAssignment(
    ts.factory.createStringLiteral(name.replaceAll('/', '-')),
    toCamelCase(name)
  )
}

function toCamelCase(name: string) {
  return ts.factory.createIdentifier(toReference(name))
}

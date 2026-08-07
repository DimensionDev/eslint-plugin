import { realpathSync } from 'node:fs'
import type ts from 'typescript'
import { createRule, ensureParserWithTypeInformation } from '../rule.ts'

const TYPESCRIPT_SOURCE_FILE = /\.(?:[cm]?ts|tsx)$/i
const DECLARATION_FILE = /\.d\.(?:[cm]?ts|ts)$/i

export default createRule({
  name: 'require-project-reference',
  meta: {
    type: 'problem',
    docs: {
      description: 'Require project references for local package imports',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      missingReference:
        'This local package resolves to a declaration file. Add its project to this tsconfig.json references and enable declarationMap.',
    },
  },

  create(context) {
    ensureParserWithTypeInformation(context.sourceCode.parserServices)
    const { esTreeNodeToTSNodeMap, program } = context.sourceCode.parserServices

    return {
      ImportDeclaration(node) {
        if (!isPackageImport(node.source.value)) return

        const moduleSpecifier = esTreeNodeToTSNodeMap.get(node.source)
        const resolvedModule = getProgramNavigation(program).getResolvedModuleFromModuleSpecifier(
          moduleSpecifier as ts.StringLiteralLike,
        )?.resolvedModule
        if (!resolvedModule || !DECLARATION_FILE.test(resolvedModule.resolvedFileName)) return

        const resolvedFileName = realpath(resolvedModule.resolvedFileName)
        if (isInNodeModules(resolvedFileName)) return

        const redirect = getProjectReferenceRedirect(program, resolvedModule.resolvedFileName)
        if (redirect && TYPESCRIPT_SOURCE_FILE.test(redirect.source)) return

        context.report({ node: node.source, messageId: 'missingReference' })
      },
    }
  },
})

function isPackageImport(specifier: string) {
  return !specifier.startsWith('.') && !specifier.startsWith('/') && !specifier.startsWith('node:')
}

function realpath(fileName: string) {
  try {
    return realpathSync.native(fileName)
  } catch {
    return fileName
  }
}

function isInNodeModules(fileName: string) {
  return fileName.split(/[\\/]/).includes('node_modules')
}

function getProjectReferenceRedirect(program: ts.Program, fileName: string) {
  const navigation = getProgramNavigation(program)
  return navigation.getRedirectFromOutput(navigation.getCanonicalFileName(fileName))
}

function getProgramNavigation(program: ts.Program): ProgramWithNavigation {
  return program as ts.Program & ProgramWithNavigation
}

interface ProgramWithNavigation {
  getResolvedModuleFromModuleSpecifier(
    moduleSpecifier: ts.StringLiteralLike,
  ): ts.ResolvedModuleWithFailedLookupLocations | undefined
  getCanonicalFileName(fileName: string): string
  getRedirectFromOutput(fileName: string): ProjectReferenceRedirect | undefined
}

interface ProjectReferenceRedirect {
  source: string
}

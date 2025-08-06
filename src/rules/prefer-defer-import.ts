import type { TSESTree } from '@typescript-eslint/types'
import type { ReportFixFunction, RuleContext, RuleFixer, SourceCode } from '@typescript-eslint/utils/ts-eslint'
import { AST_NODE_TYPES } from '@typescript-eslint/types'
import { createRule } from '../rule.ts'
import { SyntaxKind } from 'typescript'

export interface Options {
  deferPackages?: string[]
  eagerPackages?: string[]
}

export default createRule({
  name: 'prefer-defer-import',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Prefer defer import a module.',
    },
    schema: [
      {
        type: 'object',
        oneOf: [
          {
            type: 'object',
            additionalProperties: false,
            properties: {
              deferPackages: { type: 'array', items: { type: 'string' }, minItems: 0 },
            },
          },
          {
            type: 'object',
            additionalProperties: false,
            properties: {
              eagerPackages: { type: 'array', items: { type: 'string' }, minItems: 0 },
            },
          },
        ],
      },
    ],
    messages: {
      prefer: 'Prefer import the package with defer syntax.',
    },
  },
  defaultOptions: [{ deferPackages: undefined, eagerPackages: undefined } as Options],
  create(context, [options]) {
    if (options.deferPackages === undefined && options.eagerPackages === undefined) {
      return {}
    }
    if (options.deferPackages && options.eagerPackages)
      throw new Error('Cannot use both deferPackages and eagerPackages in the rule prefer-defer-import.')
    function handle(
      node: TSESTree.ImportDeclaration | TSESTree.ExportAllDeclaration | TSESTree.ExportNamedDeclaration,
    ) {
      if (!options || !needFix(node, context.sourceCode, options)) return
      const fix = makeFixer(context, node)
      context.report({ node, messageId: 'prefer', fix })
    }
    return {
      ImportDeclaration: handle,
      ExportAllDeclaration: handle,
      ExportNamedDeclaration: handle,
    }
  },
})

function needFix(
  node: TSESTree.ImportDeclaration | TSESTree.ExportAllDeclaration | TSESTree.ExportNamedDeclaration,
  code: Readonly<SourceCode>,
  options: Options,
) {
  if (!node.source) return false
  if (node.type === AST_NODE_TYPES.ImportDeclaration && (node.importKind === 'type' || node.specifiers.length === 0))
    return false
  const [char] = node.source.value
  // nodejs import map, relative url, absolute url
  if (char === '#' || char === '.' || char === '/') return false
  if (
    node.type === AST_NODE_TYPES.ExportNamedDeclaration &&
    (node.exportKind === 'type' || node.specifiers.length === 0)
  )
    return false
  if (options.deferPackages && !options.deferPackages.includes(node.source.value)) return false
  if (options.eagerPackages?.includes(node.source.value)) return false

  if (node.type === AST_NODE_TYPES.ImportDeclaration) {
    // TODO: https://github.com/typescript-eslint/typescript-eslint/issues/11389
    // typescript-eslint does not provide phaseModifier yet.
    const tsNode = code.parserServices?.esTreeNodeToTSNodeMap?.get(node)
    if (tsNode) {
      if (tsNode.importClause?.phaseModifier === SyntaxKind.DeferKeyword) {
        return false
      }
    } else {
      if (code.getText(node).replaceAll(/\s+/g, ' ').includes('import defer')) return false
    }
  }

  return true
}

function makeFixer(
  context: Readonly<RuleContext<'prefer', readonly [options?: Options | undefined]>>,
  node: TSESTree.ImportDeclaration | TSESTree.ExportAllDeclaration | TSESTree.ExportNamedDeclaration,
): ReportFixFunction | null {
  if (node.type === AST_NODE_TYPES.ExportNamedDeclaration || !node.source) return null
  if (
    context.sourceCode
      .getDeclaredVariables(node)
      .some((x) => x.references.some((x) => x.identifier.parent?.type === AST_NODE_TYPES.ExportSpecifier))
  )
    return null

  return function* (fixer) {
    if (node.type !== AST_NODE_TYPES.ImportDeclaration) return

    // reuse the name from the original import if possible
    const suggestedName =
      (
        node.specifiers.find((x) => x.type === AST_NODE_TYPES.ImportNamespaceSpecifier) as
          | TSESTree.ImportNamespaceSpecifier
          | undefined
      )?.local.name ??
      (
        node.specifiers.find((x) => x.type === AST_NODE_TYPES.ImportDefaultSpecifier) as
          | TSESTree.ImportDefaultSpecifier
          | undefined
      )?.local.name ??
      node.source.value.replaceAll(/[^\dA-Za-z]/g, '_')

    {
      let imports = `import defer * as ${suggestedName} from ${node.source.raw}`
      let attributes = ''
      const assertionList: string[] = []
      if (node.attributes.length > 0) {
        attributes += ` assert {`
        for (const assertion of node.attributes) {
          assertionList.push(
            ` ${assertion.key.type === AST_NODE_TYPES.Literal ? assertion.key.raw : assertion.key.name}: ${
              assertion.value.raw
            }`,
          )
        }
        attributes += assertionList.join(', ') + ' }'
      }
      imports += attributes
      imports += ';'

      let typeOnlyImports = 'import type { '
      const typeOnlyImportList: string[] = []
      let useTypeOnlyImports = false
      for (const spec of node.specifiers) {
        if (spec.type === AST_NODE_TYPES.ImportSpecifier && spec.importKind === 'type') {
          useTypeOnlyImports = true
          typeOnlyImportList.push(
            spec.imported.type === AST_NODE_TYPES.Identifier && spec.imported.name === spec.local.name
              ? spec.imported.name
              : `${spec.imported.type === AST_NODE_TYPES.Identifier ? spec.imported.name : JSON.stringify(spec.imported.value)} as ${spec.local.name}`,
          )
        }
      }
      if (useTypeOnlyImports) {
        typeOnlyImports += typeOnlyImportList.join(', ') + ' } from ' + node.source.raw + attributes + ';'
        imports += ' '
        imports += typeOnlyImports
      }
      if (node.specifiers.every((x) => x.type === AST_NODE_TYPES.ImportSpecifier && x.importKind === 'type')) {
        yield fixer.replaceText(node, typeOnlyImports)
        return
      }
      yield fixer.replaceText(node, imports)
    }

    for (const spec of node.specifiers) {
      if (spec.type === AST_NODE_TYPES.ImportNamespaceSpecifier) continue
      if (spec.type === AST_NODE_TYPES.ImportDefaultSpecifier) {
        yield* replaceAllReference(context, spec, `${suggestedName}.default`, fixer)
      } else {
        if (spec.importKind === 'type') continue
        const imported = spec.imported
        yield* replaceAllReference(
          context,
          spec,
          imported.type === AST_NODE_TYPES.Identifier && /^\p{ID_Start}\p{ID_Continue}{0,}$/u.test(imported.name)
            ? `${suggestedName}.${imported.name}`
            : `${suggestedName}[${JSON.stringify(imported.type === AST_NODE_TYPES.Identifier ? imported.name : imported.value)}]`,
          fixer,
        )
      }
    }
  }
}

function* replaceAllReference(
  context: Readonly<RuleContext<'prefer', readonly [options?: Options | undefined]>>,
  node: TSESTree.Node,
  replacement: string,
  fixer: RuleFixer,
) {
  const variables = context.sourceCode.getDeclaredVariables(node)
  if (variables.length !== 1) throw new Error('Expected exactly one reference')
  if (replacement === variables[0].name) return

  for (const reference of variables[0].references) {
    const id = reference.identifier
    if (id.parent?.type === AST_NODE_TYPES.Property && id.parent.shorthand && id.parent.value === id) {
      yield fixer.replaceText(id.parent, `${id.name}: ${replacement}`)
    } else {
      yield fixer.replaceText(id, replacement)
    }
  }
}

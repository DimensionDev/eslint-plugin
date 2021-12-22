import type { ParserServices } from '@typescript-eslint/utils'
import type ts from 'typescript'
import type { RuleContext, RuleListener, RuleMetaData } from '@typescript-eslint/utils/dist/ts-eslint'

const BASE_URL = 'https://dimensiondev.github.io/eslint-plugin/src/rules/'

export interface RuleModule<
  TResolvedOptions,
  TOptions extends readonly unknown[],
  TMessageIDs extends string,
  TRuleListener extends RuleListener
> {
  readonly name: string
  readonly meta: RuleMetaData<TMessageIDs>
  resolveOptions?(...options: TOptions): TResolvedOptions
  create(context: Readonly<RuleContext<TMessageIDs, TOptions>>, options: TResolvedOptions): TRuleListener
}

export interface ExportedRuleModule<
  TOptions extends readonly unknown[] = unknown[],
  TMessageIDs extends string = string,
  TRuleListener extends RuleListener = RuleListener
> {
  readonly name: string
  readonly meta: RuleMetaData<TMessageIDs>
  create(context: Readonly<RuleContext<TMessageIDs, TOptions>>): TRuleListener
}

export function createRule<
  TResolvedOptions,
  TOptions extends unknown[],
  TMessageIDs extends string,
  TRuleListener extends RuleListener = RuleListener
>({ name, meta, create, resolveOptions }: RuleModule<TResolvedOptions, TOptions, TMessageIDs, TRuleListener>) {
  if (meta?.docs) {
    meta.docs.url ??= new URL(name, BASE_URL).toString()
  }
  return Object.freeze<ExportedRuleModule<TOptions, TMessageIDs, TRuleListener>>({
    name,
    meta,
    create(context) {
      const options = resolveOptions?.(...context.options) ?? (context.options[0] as TResolvedOptions)
      const listener = Object.entries(create(context, options))
      return Object.fromEntries(listener.filter((pair) => pair[1])) as TRuleListener
    },
  })
}

interface ModifiedParserServices extends ParserServices {
  typeChecker: ts.TypeChecker
}

export function getParserServices(context: Readonly<RuleContext<string, unknown[]>>): Readonly<ModifiedParserServices> {
  if (!context.parserServices) {
    throw new Error('see https://typescript-eslint.io/docs/linting/type-linting')
  }
  const { program, esTreeNodeToTSNodeMap, tsNodeToESTreeNodeMap, hasFullTypeInformation } = context.parserServices
  return {
    program,
    typeChecker: program.getTypeChecker(),
    esTreeNodeToTSNodeMap,
    tsNodeToESTreeNodeMap,
    hasFullTypeInformation,
  }
}

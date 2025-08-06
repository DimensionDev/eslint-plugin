import type { ParserServices, ParserServicesWithTypeInformation } from '@typescript-eslint/utils'
import { applyDefault, type RuleWithMetaAndName } from '@typescript-eslint/utils/eslint-utils'
import type { RuleContext, RuleListener, RuleModule } from '@typescript-eslint/utils/ts-eslint'

const BASE_URL = 'https://dimensiondev.github.io/eslint-plugin/src/rules/'

export interface RuleModuleWithName<
  MessageIds extends string = string,
  Options extends readonly unknown[] = [],
  Docs = unknown,
  ExtendedRuleListener extends RuleListener = RuleListener,
> extends RuleModule<MessageIds, Options, Docs, ExtendedRuleListener> {
  readonly name: string
}
export type RuleModuleWithNameDefault = RuleModuleWithName<string, [], DocType>

export type { RuleContext } from '@typescript-eslint/utils/ts-eslint'
export type DocType = {
  recommended?: 'recommended' | 'strict' | 'stylistic'
  requiresTypeChecking?: boolean
}

export function createRule<Options extends readonly unknown[], MessageIds extends string, PluginDocs = unknown>({
  create,
  defaultOptions,
  meta,
  name,
}: Readonly<RuleWithMetaAndName<Options, MessageIds, PluginDocs>>): RuleModuleWithName<
  MessageIds,
  Options,
  PluginDocs
> {
  if (meta.docs && !meta.docs.url) {
    meta.docs.url = new URL(name, BASE_URL).href
  }
  const rule = {
    create(context: Readonly<RuleContext<MessageIds, Options>>): RuleListener {
      const optionsWithDefault = applyDefault(defaultOptions, context.options)
      return create(context, optionsWithDefault)
    },
    defaultOptions,
    meta,
    name,
  }
  return rule
}

export function ensureParserWithTypeInformation(
  parserServices: Partial<ParserServices> | undefined,
): asserts parserServices is ParserServicesWithTypeInformation {
  if (!parserServices?.program) {
    throw new Error('see https://typescript-eslint.io/docs/linting/type-linting')
  }
}

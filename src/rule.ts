import type { ParserServices, ParserServicesWithTypeInformation } from '@typescript-eslint/utils'
import type { RuleWithMetaAndName } from '@typescript-eslint/utils/eslint-utils'
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

// Derived from @typescript-eslint/utils to avoid runtime dependency
// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/utils/src/eslint-utils/deepMerge.ts
function deepMerge(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  first: any = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  second: any = {},
): Record<string, unknown> {
  // get the unique set of keys across both objects
  const keys = new Set([...Object.keys(first), ...Object.keys(second)])

  return Object.fromEntries(
    [...keys].map((key) => {
      const firstHasKey = key in first
      const secondHasKey = key in second
      const firstValue = first[key]
      const secondValue = second[key]

      let value
      if (firstHasKey && secondHasKey) {
        if (
          typeof firstValue === 'object' &&
          !Array.isArray(firstValue) &&
          typeof secondValue === 'object' &&
          !Array.isArray(secondValue)
        ) {
          // object type
          value = deepMerge(firstValue, secondValue)
        } else {
          // value type
          value = secondValue
        }
      } else if (firstHasKey) {
        value = firstValue
      } else {
        value = secondValue
      }
      return [key, value]
    }),
  )
}

// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/utils/src/eslint-utils/applyDefault.ts
function applyDefault<User extends readonly unknown[], Default extends User>(
  defaultOptions: Readonly<Default>,
  userOptions: Readonly<User> | null,
): Default {
  const options = structuredClone(defaultOptions) as AsMutable<Default>

  if (userOptions == null) {
    return options
  }

  ;(options as unknown[]).forEach((opt: unknown, i: number) => {
    if (userOptions[i] !== undefined) {
      const userOpt = userOptions[i]

      if (typeof userOpt === 'object' && !Array.isArray(userOpt) && typeof opt === 'object' && !Array.isArray(opt)) {
        options[i] = deepMerge(opt, userOpt)
      } else {
        options[i] = userOpt
      }
    }
  })

  return options
}

type AsMutable<T extends readonly unknown[]> = {
  -readonly [Key in keyof T]: T[Key]
}

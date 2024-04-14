import type { TSESTree } from '@typescript-eslint/types'
import type { ReportFixFunction, RuleListener } from '@typescript-eslint/utils/ts-eslint'
import { createRule } from '../../rule.js'

// https://unicode.org/reports/tr18
// https://unicode.org/reports/tr51
const BUILT_PATTERN = /\P{ASCII}/u

export interface Options {
  pattern: RegExp['source']
  flags: RegExp['flags']
  only: 'code' | 'comment'
}

interface ResolvedOptions {
  only?: Options['only']
  pattern: RegExp
}

export default createRule({
  name: 'unicode/specific-set',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Limit the range of literal characters',
    },
    schema: [
      {
        type: 'object',
        properties: {
          pattern: { type: 'string' },
          flags: { type: 'string' },
          only: { type: 'string', enum: ['code', 'comment'] },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      illegal: 'Illegal character detected',
    },
  },
  resolveOptions(options?: Partial<Options>): ResolvedOptions {
    const pattern = options?.pattern ? new RegExp(options.pattern, options.flags ?? 'u') : BUILT_PATTERN
    return { pattern, only: options?.only }
  },
  create(context, { pattern, only }: ResolvedOptions) {
    return makeProgramListener(pattern, (node, kind) => {
      if (only && only !== kind) return
      const matcher = new RegExp(pattern.source, 'gu')
      const fix = getFixer(node, matcher)
      context.report({ node, messageId: 'illegal', fix })
    })
  },
})

export function makeProgramListener(
  pattern: RegExp,
  onReport: (node: TSESTree.Token, kind: string) => void,
): RuleListener {
  return {
    Program(program: TSESTree.Program) {
      for (const token of program.tokens ?? []) {
        const value = getValue(token)
        if (value === false) continue
        if (!pattern.test(value)) continue
        onReport(token, 'code')
      }
      for (const comment of program.comments ?? []) {
        if (!pattern.test(comment.value)) continue
        onReport(comment, 'comment')
      }
    },
  }
}

export function getFixer(token: TSESTree.Token, pattern: RegExp): ReportFixFunction | undefined {
  switch (token.type) {
    case 'String':
    case 'Template': {
      return (fixer) => {
        const prefix = token.value.slice(0, 1)
        const suffix = token.value.slice(-1)
        const modified = escape(token.value.slice(1, -1), pattern)
        return fixer.replaceText(token, `${prefix}${modified}${suffix}`)
      }
    }
    case 'JSXText': {
      return (fixer) => {
        const modified = token.value.replace(pattern, (match) => `&#x${toString(match.codePointAt(0)!)};`)
        return fixer.replaceText(token, modified)
      }
    }
    case 'RegularExpression': {
      return (fixer) => {
        const flags = new Set(token.regex.flags)
        flags.add('u')
        const re = new RegExp(escape(token.regex.pattern, pattern), [...flags].join(''))
        return fixer.replaceText(token, re.toString())
      }
    }
  }
  return
}

export function escape(input: string, pattern: RegExp) {
  return input.replace(pattern, (match) => {
    const point = match.codePointAt(0)!
    return point > 65_535 ? `\\u{${toString(point)}}` : `\\u${toString(point)}`
  })
}

function toString(point: number) {
  return point.toString(16).padStart(4, '0').toUpperCase()
}

function getValue(token: TSESTree.Token) {
  switch (token.type) {
    case 'String':
    case 'Template': {
      return token.value.slice(1, -1)
    }
    case 'Identifier': {
      if (token.value.startsWith('#')) {
        return token.value.slice(1)
      }
      return token.value
    }
    case 'RegularExpression': {
      return token.regex.pattern
    }
    case 'JSXText':
    case 'JSXIdentifier': {
      return token.value
    }
  }
  return false
}

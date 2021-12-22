import { createRule } from '../rule'
import { getFixer, makeProgramListener } from './unicode-specific-set'

// Generated using
// https://github.com/hediet/vscode-unicode-data
// https://npm.io/regexgen
const INVISIBLE_PATTERN = combinePattern(
  /\u00AD\u034F\u061C\u17B4\u17B5\uFEFF\uFFFC/,
  /\u180B-\u180E/,
  /\u200B-\u200F/,
  /\u202A-\u202E/,
  /\u2060-\u206F/,
  /\uFE00-\uFE0F/,
  /\uFFF0-\uFFF8/,
  /\u{1D173}-\u{1D17A}/u,
  /\u{E0000}-\u{E007F}/u,
  /\u{E0100}-\u{E01EF}/u
)

export default createRule({
  name: 'no-invisible-characters',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Disallow invisible characters',
      recommended: 'error',
    },
    schema: [],
    messages: {
      illegal: 'Illegal character detected',
    },
  },
  create(context) {
    return makeProgramListener(INVISIBLE_PATTERN, (node) => {
      const matcher = new RegExp(INVISIBLE_PATTERN.source, 'gu')
      const fix = getFixer(node, matcher)
      context.report({ node, messageId: 'illegal', fix })
    })
  },
})

function combinePattern(...patterns: Array<string | RegExp>) {
  const source = patterns.map((re) => (typeof re === 'string' ? re : re.source)).join('')
  return new RegExp(`[${source}]`, 'u')
}

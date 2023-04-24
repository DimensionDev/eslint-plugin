import { createRule } from '../../rule.js'
import { escape, getFixer, makeProgramListener } from './specific-set.js'

const BIDI_PATTERN = /[\u061C\u202A-\u202E\u2066-\u2069]/

export default createRule({
  name: 'unicode/no-bidi',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Detect and stop Trojan Source attacks',
      recommended: false,
    },
    schema: [],
    messages: {
      detected: 'Detected potential trojan source attack with unicode bidi introduced in this {{kind}}: {{text}}.',
    },
  },
  create(context) {
    return makeProgramListener(BIDI_PATTERN, (node, kind) => {
      const matcher = new RegExp(BIDI_PATTERN.source, 'gu')
      const data = { kind, text: escape(node.value, matcher) }
      const fix = getFixer(node, matcher)
      context.report({ node, data, messageId: 'detected', fix })
    })
  },
})

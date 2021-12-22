import type { Statement, Node, BlockStatement } from '@typescript-eslint/types/dist/ast-spec'
import type { ReportFixFunction, RuleContext } from '@typescript-eslint/utils/dist/ts-eslint'
import { isFunctionLike } from '../node'
import { createRule } from '../rule'
import { wrap } from '../utils'

interface Options {
  maximumStatements: number
}

export default createRule({
  name: 'prefer-early-return',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Prefer early returns over full-body conditional wrapping in function declarations',
      recommended: 'error',
    },
    schema: [
      {
        type: 'object',
        properties: { maximumStatements: { type: 'integer', minimum: 0 } },
        additionalProperties: false,
      },
    ],
    messages: {
      prefer: 'Prefer an early return to a conditionally-wrapped function body',
    },
  },
  resolveOptions(options?: Options) {
    return options?.maximumStatements ?? 1
  },
  create(context, maximumStatements: number) {
    function handle({ body, parent }: BlockStatement) {
      if (!isFunctionLike(parent)) return
      const simplifiable = body.length === 1 && isOffending(body[0], maximumStatements)
      if (!simplifiable) return
      const fix = makeFixer(context, body[0])
      context.report({ node: body[0], messageId: 'prefer', fix })
    }
    return {
      BlockStatement: handle,
    }
  },
})

function makeFixer(context: Readonly<RuleContext<string, unknown[]>>, parent: Statement): ReportFixFunction {
  return function* (fixer) {
    if (parent.type !== 'IfStatement') return
    const source = context.getSourceCode()
    const { test, consequent } = parent
    yield fixer.insertTextBefore(test, '!(')
    yield fixer.insertTextAfter(test, ')')
    yield fixer.replaceText(consequent, 'return;')
    const modified = wrap(source.getText(consequent), (input) =>
      consequent.type === 'BlockStatement' ? input.slice(1, -1) : input
    )
    yield fixer.insertTextAfter(parent, modified)
  }
}

function isOffending(node: Node, maximumStatements: number) {
  if (!(node.type === 'IfStatement' && node.alternate === null)) {
    return false
  }
  const { consequent } = node
  return (
    (consequent.type === 'ExpressionStatement' && maximumStatements === 0) ||
    (consequent.type === 'BlockStatement' && consequent.body.length > maximumStatements)
  )
}

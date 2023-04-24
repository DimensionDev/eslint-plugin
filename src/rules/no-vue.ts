import { createRule } from '../rule.js'
import { quote } from '../utils.js'

export default createRule({
  name: 'no-vue',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow Vue.js in this project',
      recommended: 'error',
    },
    schema: [],
    messages: {
      disallow: 'Disallow {{name}} in this project!',
    },
    hidden: true,
  },
  create(context) {
    return {
      Program(program) {
        if (!context.getFilename().endsWith('.vue')) return
        context.report({
          node: program,
          messageId: 'disallow',
          data: { name: 'Vue.js' },
        })
      },
      ImportDeclaration(node) {
        const packageName = node.source.value
        if (!isVueEcosystem(packageName)) return
        context.report({
          node,
          messageId: 'disallow',
          data: { name: quote(packageName) },
        })
      },
    }
  },
})

function isVueEcosystem(name: string) {
  if (name.startsWith('.')) return false
  name = name.toLowerCase()
  /* cspell:ignore vuex */
  return (
    name === 'vue' ||
    name === 'vuex' ||
    name.startsWith('@vue/') ||
    name.startsWith('vue-') ||
    name.startsWith('vuex-') ||
    name.endsWith('-vue') ||
    name.endsWith('-vuex') ||
    name.includes('/vue-') ||
    name.includes('-vue-') ||
    name.includes('-vuex-')
  )
}

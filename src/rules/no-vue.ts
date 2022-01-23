import { createRule } from '../rule'
import { quote } from '../utils'

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
  },
  create(context) {
    return {
      Program(program) {
        if (context.getFilename().endsWith('.vue')) {
          context.report({
            node: program,
            messageId: 'disallow',
            data: { name: 'Vue.js' },
          })
          return
        }
        for (const decl of program.body) {
          if (decl.type !== 'ImportDeclaration') continue
          if (isVueEcosystem(decl.source.value)) {
            context.report({
              node: decl,
              messageId: 'disallow',
              data: { name: quote(decl.source.value) },
            })
          }
        }
      },
    }
  },
})

function isVueEcosystem(name: string) {
  if (name.startsWith('.')) return false
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

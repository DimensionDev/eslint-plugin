import { fileURLToPath } from 'node:url'
import { tester } from '../spec.ts'
import module from './require-project-reference.ts'

const fixture = fileURLToPath(new URL('../../test/fixtures/require-project-reference/', import.meta.url))

tester.test(module, {
  valid: [
    {
      filename: `${fixture}referenced/app/src/index.ts`,
      code: `import { data } from 'lib'`,
    },
    {
      filename: `${fixture}referenced/app/src/index.ts`,
      code: `import { data } from 'source-lib'`,
    },
    {
      filename: `${fixture}third-party/app/src/index.ts`,
      code: `import { data } from 'lib'`,
    },
    {
      filename: `${fixture}missing/app/src/index.ts`,
      code: `import { data } from '../local.ts'`,
    },
    {
      filename: `${fixture}missing/app/src/index.ts`,
      code: `import { data } from 'lib'`,
      options: [{ ignore: ['lib'] }],
    },
  ],
  invalid: [
    {
      filename: `${fixture}missing/app/src/index.ts`,
      code: `import { data } from 'lib'`,
      errors: [{ messageId: 'missingReference' }],
    },
    {
      filename: `${fixture}missing/app/src/index.ts`,
      code: `import { data } from 'source-lib'`,
      errors: [{ messageId: 'missingReference' }],
    },
  ],
})

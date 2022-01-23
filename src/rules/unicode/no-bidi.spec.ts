import dedent from 'ts-dedent'
import { runTest } from '../../spec'
import module from './no-bidi'

runTest({
  module,
  *invalid() {
    yield {
      code: dedent`
        const accessLevel = "user";
        if (accessLevel != "user\u202E \u2066// Check if admin\u2069 \u2066") {
          console.log("You are an admin.");
        }
      `,
      output: dedent`
        const accessLevel = "user";
        if (accessLevel != "user\\u202E \\u2066// Check if admin\\u2069 \\u2066") {
          console.log("You are an admin.");
        }
      `,
      errors: [
        {
          messageId: 'detected',
          data: { kind: 'code', text: '"user\\u202E \\u2066// Check if admin\\u2069 \\u2066"' },
        },
      ],
    }
  },
})

import prettier from 'prettier'
import { ROOT_PATH } from './paths'

export async function format(source: string, parser: prettier.Config['parser']) {
  const config = await prettier.resolveConfig(ROOT_PATH, {
    editorconfig: true,
  })
  return prettier.format(source, { parser, ...config })
}

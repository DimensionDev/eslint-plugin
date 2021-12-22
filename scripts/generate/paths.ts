/* eslint-disable unicorn/prefer-module */
import path from 'node:path'

export const ROOT_PATH = path.resolve(__dirname, '..', '..')
export const SOURCE_PATH = path.join(ROOT_PATH, 'src')
export const RULE_PATH = path.join(SOURCE_PATH, 'rules')
export const CONFIG_PATH = path.join(SOURCE_PATH, 'configs')

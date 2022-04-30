import type { JSXAttribute, Node } from '@typescript-eslint/types/dist/generated/ast-spec'
import { createRule } from '../../rule'

interface Options {
  'id': string
  'elements': string[]
  'attributes': string[]
  'ignore-attributes': string[]
}

const DEFAULT_ELEMENT_LIST = ['a', 'button', 'input', 'textarea']
const DEFAULT_ATTRIBUTE_LIST = ['editable', 'onInput', 'onChange', 'onClick', 'onKeyDown', 'onKeyUp', 'onSubmit']
const DEFAULT_IGNORE_ATTRIBUTE_LIST = ['hidden', 'disabled', 'readonly']

export default createRule({
  name: 'jsx/prefer-test-id',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforces `data-test-id` attribute is present on interactive DOM elements to help with UI testing',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {
          'id': { type: 'string' },
          'elements': { type: 'array', items: { type: 'string' }, uniqueItems: true },
          'attributes': { type: 'array', items: { type: 'string' }, uniqueItems: true },
          'ignore-attributes': { type: 'array', items: { type: 'string' }, uniqueItems: true },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      element: '<{{element}}> elements must have a `{{id}}` attribute',
      attribute: '<{{element}}> with an `{{name}}` handler must have a `{{id}}` attribute',
    },
  },
  resolveOptions(options?: Partial<Options>): Options {
    return {
      'id': options?.id ?? 'data-test-id',
      'elements': options?.elements ?? DEFAULT_ELEMENT_LIST,
      'attributes': options?.attributes ?? DEFAULT_ATTRIBUTE_LIST,
      'ignore-attributes': options?.['ignore-attributes'] ?? DEFAULT_IGNORE_ATTRIBUTE_LIST,
    }
  },
  create(context, options: Options) {
    const source = context.getSourceCode()
    return {
      JSXOpeningElement(node) {
        const element = source.getText(node.name)
        const attributes = new Map(
          node.attributes
            .filter((node): node is JSXAttribute => node.type === 'JSXAttribute')
            .map(({ name, value }) => [source.getText(name), value] as const)
        )
        if (isValid(attributes.get(options.id))) return
        if (shouldIgnore(attributes, options['ignore-attributes'])) return
        if (options.elements.includes(element)) {
          context.report({
            node,
            messageId: 'element',
            data: { element, id: options.id },
          })
        } else {
          const name = options.attributes.find((name) => attributes.has(name))
          if (!name) return
          context.report({
            node,
            messageId: 'attribute',
            data: { element, name, id: options.id },
          })
        }
      },
    }
  },
})

function shouldIgnore(attributes: Map<string, JSXAttribute['value']>, ignore: string[]) {
  return ignore.some((name) => {
    const node = attributes.get(name)
    if (node === null) return true
    if (node?.type === 'JSXExpressionContainer') return false
    return isValid(node)
  })
}

function isValid(node?: Node | null): boolean {
  if (!node) return false
  switch (node.type) {
    case 'Literal':
      return Boolean(node.value)
    case 'JSXExpressionContainer':
      return true
  }
  return false
}

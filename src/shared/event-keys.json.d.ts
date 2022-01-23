// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/c193e1e/rules/shared/event-keys.js
// https://github.com/facebook/react/blob/b87aabd/packages/react-dom/src/events/getEventKey.js#L36
// Only meta characters which can't be deciphered from `String.fromCharCode()`

declare const events: Record<number, string | undefined>

export = events

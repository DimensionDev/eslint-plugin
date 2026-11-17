---
'@masknet/eslint-plugin': patch
---

# Avoid unsafe array constructor autofix

Report `new Array(...)` without an autofix and only autofix TypedArray construction when the input is known to be iterable.

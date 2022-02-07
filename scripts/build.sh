#!/bin/bash
# cspell:disable
set -xeuo pipefail
npm run generate
rm -rf lib
tsc -p tsconfig.production.json
cp -v src/schema.json lib

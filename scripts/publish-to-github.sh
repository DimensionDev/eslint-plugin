#!/bin/bash
set -xeuo pipefail
npm version "$npm_package_version-$BUILD_VERSION"
npm publish

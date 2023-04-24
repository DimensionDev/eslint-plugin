export default {
  'src/**/*': () => ['pnpm test', 'ts-node-esm -T ./src/scripts/generate/index.js'],
}

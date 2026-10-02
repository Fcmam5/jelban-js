import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: { index: 'src/index.ts', domains: 'src/domains.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
});

import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: './',
    include: ['**/*.{spec,e2e-spec}.?(c|m)[jt]s?(x)'],
  },
  plugins: [
    swc.vite(),
  ],
})

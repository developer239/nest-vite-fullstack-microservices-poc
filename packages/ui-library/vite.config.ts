import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'MyUiLibrary',
      formats: ['es', 'umd'],
      fileName: (format) => `my-ui-library.${format}.js`,
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into your library
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})

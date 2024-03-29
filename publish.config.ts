import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'BikeTag',
      formats: ['es', 'umd'],
      fileName: (format) => `biketag-admin.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'pinia', 'biketag'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'biketag-admin.css'
          return assetInfo.name!
        },
        // disable warning on src/index.ts using both default and named export
        exports: 'named',
        globals: {
          vue: 'Vue',
          pinia: 'pinia',
          biketag: 'BikeTagClient',
          'vue-router': 'vueRouter',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})

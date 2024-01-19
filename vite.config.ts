import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import envCompatible from 'vite-plugin-env-compatible'
import EnvironmentPlugin from 'vite-plugin-environment'
import { BikeTagEnv } from './src/common/constants'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  css: {
    preprocessorOptions: {
      scss: { charset: false, additionalData: `@import "./src/assets/styles/mixins.scss";` },
      css: { charset: false },
    },
  },
  plugins: [vue(), EnvironmentPlugin(BikeTagEnv), envCompatible()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/biketag-admin.js`,
        chunkFileNames: `assets/vendor.js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  // root: './public',
  server: {
    host: 'localhost',
    port: 8080,
  },
  preview: {
    port: 8080,
  },
})

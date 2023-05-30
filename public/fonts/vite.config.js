// Config for Vite Vanilla JS Multi-page Apps
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    //polyfillDynamicImport: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        next: resolve(__dirname, 'index2.html'),
      },
    },
  },
})

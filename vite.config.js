// Config for Vite Vanilla JS Multi-page Apps
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    //polyfillDynamicImport: true,
    rollupOptions: {
      // root: './src/pages'
      input: {
        main: resolve(__dirname, 'index.html'),
        // main: resolve(__dirname, 'src/pages/index.html'),
        next: resolve(__dirname, 'index2.html'),
        // map: resolve(__dirname, 'src/pages/index2.html'),
        // map: resolve(__dirname, 'src/pages/map.html'),
      },
    },
  },
})

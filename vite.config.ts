import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  /**
   * NOTE: All scss files that contains variables, need to be imported globally and separately!
   * Globally because otherwise vite can't resolve the variables
   * Separately because most of the theme scss files that actually contain variables, rely on another
   */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/base.scss";
        `,
      },
    },
  },
})

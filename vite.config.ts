import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    proxy: {
      '/signin': {
        target: "http://192.168.56.1:5256",
        changeOrigin: true,
        secure: false,
      },
      '/user': {
        target: "http://192.168.56.1:5256",
        changeOrigin: true,
        secure: false,
      }
    },
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

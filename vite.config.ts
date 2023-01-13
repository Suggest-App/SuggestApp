import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        },
        includeAssets: [
            'images/*.png',
            'favicon.ico',
            'favicon-16x16.png',
            'favicon-32x32.png',
            'android-chrome-192x192.png',
            'android-chrome-512x512.png',
            'apple-touch-icon.png',
            'mstile-150x150.png',
            'safari-pinned-tab.svg',
            'masked-icon.svg'
        ],
        manifest: {
          name: 'Music Buddies',
          short_name: 'MBuddies',
          description: 'My Awesome App description',
          theme_color: '#121212',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    proxy: {
      '/signin': {
        target: "http://localhost:5256",
        changeOrigin: true,
        secure: false,
      },
      '/user': {
        target: "http://localhost:5256",
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

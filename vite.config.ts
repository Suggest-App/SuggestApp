import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: [
          '**/*.{js,css,ico,png,svg}',
        ]
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
    },
  },
  server: {
    proxy: {
      '/signin': {
        //target: "http://localhost:5256",
        target: "https://dev.suggest-app.com",
        //target: "http://188.68.62.150:4214",
        changeOrigin: true,
        secure: false,
      },
      '/user': {
        target: "https://dev.suggest-app.com",
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: "https://dev.suggest-app.com",
        changeOrigin: true,
        secure: false,
      },
      '/list-users': {
        target: "https://dev.suggest-app.com",
        changeOrigin: true,
        secure: false,
      }
    },
  },

  /**
   * NOTE: All scss files that contains variables, need to be imported globally
   *       because otherwise vite can't resolve the variables
   */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/base.scss";
          @import "@/assets/scss/skeleton-loader.scss";
        `,
      },
    },
  },
})

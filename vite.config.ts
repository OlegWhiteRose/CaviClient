import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8080';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fonts/*.ttf', 'vite.svg'],
      manifest: {
        name: 'CAVI Калькулятор',
        short_name: 'CAVI',
        description: 'Система расчёта индекса CAVI',
        theme_color: '#004FC7',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: 'vite.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        // Кэширование статических ресурсов
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,woff,woff2,ttf}'],
        // Кэширование API GET запросов
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*\/api\/cavi-groups.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-groups-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24 часа
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https?:\/\/.*\/api\/cavi-calculations.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-calculations-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60, // 1 час
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https?:\/\/.*\.(png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 дней
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
      },
    },
  },
});

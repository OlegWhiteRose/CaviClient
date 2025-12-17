import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';
import fs from 'node:fs';
import path from 'node:path';

// Для dev режима используем localhost, для Tauri build - IP
const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8080';
const minioUrl = 'http://localhost:9000';

// Для GH Pages используем /rip_frontend/, для Tauri и dev - /
const base = process.env.GITHUB_PAGES ? '/rip_frontend/' : '/';

// HTTPS сертификаты (создаются командой: mkcert create-ca && mkcert create-cert)
const httpsConfig = fs.existsSync('./cert.key') ? {
  key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
} : undefined;

export default defineConfig({
  base,
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fonts/*.ttf', 'vite.svg'],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'CAVI Калькулятор',
        short_name: 'CAVI',
        description: 'Система расчёта индекса CAVI',
        start_url: base,
        theme_color: '#004FC7',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
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
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,woff,woff2,ttf}'],
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*\/api\/cavi-groups.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-groups-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
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
                maxAgeSeconds: 60 * 60,
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
                maxAgeSeconds: 60 * 60 * 24 * 30,
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
    https: httpsConfig,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
      '/img-proxy': {
        target: minioUrl,
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/img-proxy/, ''),
      },
    },
  },
  clearScreen: false,
});

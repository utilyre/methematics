import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/methematics/',
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Methematics',
        short_name: 'Methematics',
        description: 'Find all the possible divisors of a given number.',
        background_color: '#293241',
        theme_color: '#3d5a80',
        icons: [
          {
            src: '/methematics-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/methematics-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})

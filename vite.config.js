import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Recipe Box',
        short_name: 'RecipeBox',
        description: 'A simple recipe manager built with React and localStorage.',
        theme_color: '#ff6f61',
        background_color: '#fff0f5',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/image.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/image.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})

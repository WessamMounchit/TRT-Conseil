import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: "TRT Conseil",
        name: "TRT Conseil",
        description: "TRT Conseil est une agence de recrutement spécialisée dans l’hôtellerie et la restauration.",
        icons: [
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any"
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable"
          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#002b75",
        background_color: "#002b75",
      }
    })
  ],
})

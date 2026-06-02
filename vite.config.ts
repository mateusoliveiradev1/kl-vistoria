import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import Sitemap from 'vite-plugin-sitemap'
import { serviceLocations } from './src/data/locations'

const dynamicRoutes = [
  '/areas-de-atendimento',
  '/politica-de-privacidade',
  ...serviceLocations.map(loc => `/${loc.slug}`)
]

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'KL Vistorias Cautelar',
        short_name: 'KL Vistorias',
        description: 'Vistoria cautelar e pericia automotiva em Goiania.',
        theme_color: '#080B10',
        background_color: '#080B10',
        lang: 'pt-BR',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
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
    }),
    Sitemap({
      hostname: 'https://klvistorias.com.br',
      dynamicRoutes,
      lastmod: new Date('2026-06-02')
    })
  ],
})

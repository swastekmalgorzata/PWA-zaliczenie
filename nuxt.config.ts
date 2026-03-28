export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
  ],

  css: ['~/assets/scss/main.scss'],

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Merito GOŁ',
      short_name: 'MeritoGOL',
      description: 'Student Marks Management System',
      theme_color: '#0069FF',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: undefined,
    },
  },

  app: {
    head: {
      title: 'Merito GOŁ — Student Marks Management',
      meta: [
        { name: 'description', content: 'Student Marks Management System — Merito University Gdańsk' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  vite: {},
})

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Simple Notes',
      meta: [
        { name: 'description', content: 'A minimal notes app built with Nuxt 3' },
        { name: 'theme-color', content: '#4F8EF7' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      // Set NOTES_API_BASE in environment to enable backend API
      apiBase: process.env.NOTES_API_BASE || ''
    }
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});

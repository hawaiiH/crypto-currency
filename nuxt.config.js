export default {
  // target: 'static',
  // router: {
  //   base: '/crypto-currency/'
  // },
  ssr: false,
  head: {
    title: 'crypto-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
  ],

  modules: [
    '@nuxt/http',
  ],

  build: {
  }
}

import pkg from './package'
const config = {
  host: process.env.NODE_ENV === 'development' ? 'http://api.local' : 'http://api.local',
  resource: '/wp-json/wp/v2'
}
export default {
  router: {
    base: process.env.BASE_URL,
    mode: 'history',
    middleware: 'test'
  },
  mode: 'universal',
  server: {
    port: 9000
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", type: "text/css", href: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" },
      { rel: "stylesheet", type: "text/css", href: "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" }
    ],
    script: [
    { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js' },
    { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' }]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['@nuxtjs/robots', { 
      modules: [
        '@nuxtjs/robots'
      ],
      robots: {
        robots: {
          UserAgent: '*',
          Disallow: '/'
        }
      }
    }]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:9000',
    HOST: config.host,
    RESOURCE: config.resource,
    GATEWAY: process.env.HOST + process.env.RESOURCE,
    dev: 'ini dev config',
    server: 'ini server config'
  }
}

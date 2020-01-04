import { Configuration } from '@nuxt/types'
import arrplat from '../../.arrplat.json'
const path = require('path')

const script = [
  {src: 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'}
]

const config: Configuration = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Arrplat - 企业级PaaS解决方案',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script
  },

  env: {
    // ARRPLAT_BASE_URL: 'http://arrplat.arrway.cn/api'
    ARRPLAT_BASE_URL: 'http://localhost:5500',
    BUCKET_NAME: 'arrplat'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/index.scss',
    '@arrplat/ui/lib/app.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/ElementUI',
    '~plugins/ArrplatUI',
    { src: '~/plugins/AxiosToken.ts', ssr: false },
    { src: '~/plugins/PersistedState.ts', ssr: false },
    { src: '~/plugins/Route.ts', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/svg'
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [
      'vuex-module-decorators'
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.node = {
        fs: 'empty'
      }

      // https://segmentfault.com/a/1190000011100006
      // @ts-ignore
      config.resolve.symlinks = false;
    }
  },

  router: {
    extendRoutes (routes, resolve) {
      if (!arrplat || !arrplat.plus) {
        return
      }

      arrplat.plus.plus.map(p => p.routes.map(r => routes.push(r)))
    }
  }
}

export default config

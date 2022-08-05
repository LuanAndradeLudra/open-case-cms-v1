require("dotenv").config();

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Open Case Cms",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/main.css",
    "~/assets/css/colors.css",
    "~/assets/css/components.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/bootstrap-icons.js",
    "~/plugins/toasts.js",
    "~/plugins/v-money.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
    credentials: false
  },

  auth: {
    strategies: {
      local: {
        token: {
          maxAge: false,
          type: ''
        },
        user: {
          property: 'data',
        },
        endpoints: {
          login: {
            url: '/auth/auth',
            method: 'post',
          },
          user: { url: '/auth/me', method: 'get' },
          logout: { url: '/auth/logout', method: 'get' },
        },
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/'
    },
  },

  publicRuntimeConfig: {
    env: {
      apiUrl: process.env.API_URL,
      storageUrl: process.env.API_STORAGE,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    build: {
      loaders: {
        sass: {
          implementation: require("sass"),
        },
        scss: {
          implementation: require("sass"),
        },
      },
    },
  },
};

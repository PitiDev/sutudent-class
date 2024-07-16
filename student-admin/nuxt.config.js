import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Student Admin",
    title: "Student Admin",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://pro.fontawesome.com/releases/v5.2.0/css/all.css",
      },
    ],
  },
  router: {
    middleware: ["i18n"],
  },
  loadingIndicator: {
    name: "circle",
    color: "white",
    background: "#667eea",
  },
  loading: { color: "#667eea", height: "4px" },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/main.scss", "~/assets/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vuelidate",
    "~/plugins/utils",
    "~/plugins/axios",
    "~/plugins/i18n",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/dotenv",
    "@nuxtjs/auth",
    "@nuxtjs/toast",
    "@nuxtjs/moment",
    'nuxt-sweetalert2',
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // proxyHeaders: false,
    baseURL: "http://62.72.51.83:9999/api/",//http://62.72.51.83:9999/api/
    // credentials: true
  },
  auth: {
    strategies: {
      local: {
        rewriteRedirects: true,
        autoFetchUser: false,
        localStorage: false,
        tokenRequired: true,
        tokenName: "Authorization",
        tokenType: "Bearer",
        endpoints: {
          login: {
            url: "/login",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/logout",
            method: "post",
          },
          user: {
            url: "/me",
            method: "get",
            propertyName: "data",
          },
        },
      },
    },
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },
  moment: {
    defaultTimezone: "Asia/Bangkok",
  },
  toast: {
    position: "top-right",
    duration: 3000,
    iconPack: "fontawesome",
    register: [
      // Register custom toasts
      {
        name: "my_error",
        message: (message) => message,
        options: {
          type: "error",
          icon: "fa-exclamation-circle",
        },
      },
    ],
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};

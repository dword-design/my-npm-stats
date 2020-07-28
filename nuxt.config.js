export default {
  css: ['@/assets/style.scss'],
  modules: [
    ['@dword-design/nuxt-buefy', { css: false }],
    [
      'nuxt-webfontloader',
      {
        google: {
          families: ['Source Sans Pro'],
        },
      },
    ],
  ],
}

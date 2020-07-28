export default {
  name: 'my-npm-stats',
  title: 'my-npm-stats',
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

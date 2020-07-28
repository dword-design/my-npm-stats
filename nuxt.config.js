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
    ['@nuxtjs/google-analytics', { id: 'UA-77425155-2' }],
  ],
  name: 'my-npm-stats',
  title: 'my-npm-stats',
}

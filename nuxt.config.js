import packageConfig from './package.json'

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
    ['@nuxtjs/google-gtag', { id: 'UA-77425155-2' }],
  ],
  name: 'my-npm-stats',
  title: packageConfig.description,
}

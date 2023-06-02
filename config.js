import packageConfig from './package.json'

export default {
  css: ['@/assets/style.scss'],
  modules: [
    '@dword-design/nuxt-buefy',
    [
      'unplugin-fonts/nuxt',
      {
        google: {
          families: ['Source Sans Pro'],
        },
      },
    ],
    ['nuxt-gtag', { gtag: { id: 'UA-77425155-2' } }],
  ],
  name: 'my-npm-stats',
  title: packageConfig.description,
}

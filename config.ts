import packageConfig from './package.json';

export default {
  css: ['@/assets/style.scss'],
  modules: [
    '@dword-design/nuxt-buefy',
    ['unplugin-fonts/nuxt', { google: { families: ['Source Sans Pro'] } }],
  ],
  name: 'my-npm-stats',
  title: packageConfig.description,
};

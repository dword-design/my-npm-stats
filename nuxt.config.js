import projectModule from './node_modules/@dword-design/base-config-nuxt/dist/modules/project/index.js'
import jiti from 'jiti'
import dotenv from '@dword-design/dotenv-json-extended'
import jitiBabelTransform from '@dword-design/jiti-babel-transform'
import { babel } from '@rollup/plugin-babel'

dotenv.config()

let options
try {
  const jitiInstance = jiti(process.cwd(), {
    esmResolve: true,
    interopDefault: true,
    transform: jitiBabelTransform,
  })
  options = jitiInstance('./config.js')
} catch (error) {
  if (error.message.startsWith("Cannot find module './config.js'\n")) {
    options = {}
  } else {
    throw error
  }
}

export default {
  nitro: {
    rollupConfig: {
      plugins: [babel({ babelHelpers: 'bundled' })],
    },
  },
  modules: [
    [projectModule, options],
  ],
}
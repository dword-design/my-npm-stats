import HeartOutlineIcon from '@mdi/svg/svg/heart-outline.svg'

import { defineNuxtPlugin } from '#imports'

const icons = {
  HeartOutlineIcon,
}

export default defineNuxtPlugin(nuxtApp => {
  for (const entry of Object.entries(icons)) {
    nuxtApp.vueApp.component(entry[0], entry[1])
  }
})

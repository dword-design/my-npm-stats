<template>
  <div>
    <section class="section has-text-centered">
      <h1 class="title is-size-2 has-text-primary">my-npm-stats</h1>
      <h2 class="subtitle">{{ packageConfig.description }}</h2>
    </section>
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-four-fifths">
              <form
                @submit.prevent="
                  $router.push({ query: { author: authorName } })
                "
              >
                <b-field custom-class="is-medium" horizontal label="Author">
                  <b-input
                    v-model="authorName"
                    name="author"
                    size="is-medium"
                    type="text"
                  />
                </b-field>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div
        class="container"
        :style="{
          overflowX: 'auto',
          ...(isLoading && {
            minHeight: '15rem',
            position: 'relative',
          }),
        }"
      >
        <b-loading :active="isLoading" :is-full-page="false" />
        <table v-if="packages.length > 0" class="table is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th :style="{ width: '180px' }">Weekly downloads</th>
              <th :style="{ width: '130px' }">Dependents</th>
            </tr>
          </thead>
          <tbody>
            <app-package
              v-for="packageObject in packages"
              :key="packageObject.name"
              class="h-full"
              :value="packageObject"
            />
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import packageConfig from '@/package.json'

export default {
  computed: {
    packageConfig: () => packageConfig,
  },
  data: () => ({
    authorName: '',
    isLoading: false,
    packages: [],
  }),
  head: {
    title: packageConfig.description,
  },
  watch: {
    '$route.query.author': {
      handler() {
        if (process.client) {
          nextTick(async () => {
            this.authorName = this.$route.query.author
            this.isLoading = true
            this.packages = await $fetch('/api/packages', {
              params: {
                author: this.$route.query.author,
              },
            })
            this.isLoading = false
          })
        }
      },
      immediate: true,
    },
  },
}
</script>

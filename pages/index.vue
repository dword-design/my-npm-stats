<script>
import { map, sortBy } from '@dword-design/functions'

import variables from '@/model/variables'

export default {
  data: () => ({
    authorName: '',
    isLoading: false,
    packages: [],
  }),
  head: {
    title: variables.claim,
  },
  render() {
    return (
      <div>
        <section class="section has-text-centered">
          <h1 class="title is-size-2 has-text-primary">my-npm-stats</h1>
          <h2 class="subtitle">{variables.claim}</h2>
        </section>
        <section class="hero is-primary is-bold">
          <div class="hero-body">
            <div class="container">
              <div class="columns is-centered">
                <div class="column is-half">
                  <form
                    v-on:submit_prevent={() =>
                      this.$router.push({ query: { author: this.authorName } })
                    }
                  >
                    <b-field custom-class="is-medium" horizontal label="Author">
                      <b-input
                        name="author"
                        size="is-medium"
                        type="text"
                        v-model={this.authorName}
                      />
                    </b-field>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="container">
            <div
              class="columns is-multiline"
              style={
                this.isLoading
                  ? { minHeight: '15rem', position: 'relative' }
                  : {}
              }
            >
              <b-loading active={this.isLoading} is-full-page={false} />
              {this.packages
                |> sortBy(_ => -_.weeklyDownloads)
                |> map(packageData => (
                  <div class="column is-half">
                    <app-package class="h-full" value={packageData} />
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    )
  },
  watch: {
    '$route.query.author': {
      handler() {
        if (process.client) {
          this.$nextTick(async () => {
            this.authorName = this.$route.query.author
            this.isLoading = true
            this.packages = await this.$axios.$get('/api/packages', {
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
  watchQuery: true,
}
</script>

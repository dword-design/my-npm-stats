<script>
import { map, sortBy } from '@dword-design/functions'

import packageConfig from '@/package.json'

export default {
  data: () => ({
    authorName: '',
    isLoading: false,
    packages: [],
  }),
  head: {
    title: packageConfig.description,
  },
  render() {
    return (
      <div>
        <section class="section has-text-centered">
          <h1 class="title is-size-2 has-text-primary">my-npm-stats</h1>
          <h2 class="subtitle">{packageConfig.description}</h2>
        </section>
        <section class="hero is-primary is-bold">
          <div class="hero-body">
            <div class="container">
              <div class="columns is-centered">
                <div class="column is-four-fifths">
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
          <div
            class="container"
            style={{
              overflowX: 'auto',
              ...(this.isLoading && {
                minHeight: '15rem',
                position: 'relative',
              }),
            }}
          >
            <b-loading active={this.isLoading} is-full-page={false} />
            {this.packages.length > 0 && (
              <table class="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th style={{ width: '180px' }}>Weekly downloads</th>
                    <th style={{ width: '130px' }}>Dependents</th>
                  </tr>
                </thead>
                <tbody>
                  {this.packages
                    |> sortBy(_ => -_.weeklyDownloads)
                    |> map(packageData => (
                      <app-package class="h-full" value={packageData} />
                    ))}
                </tbody>
              </table>
            )}
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

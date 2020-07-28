<script>
import { map, property, sortBy } from '@dword-design/functions'
import asyncIteratorToArray from 'async-iterator-to-array'
import npmDependants from 'npm-dependants'
import npmPackageDownloads from 'npm-package-downloads'

export default {
  asyncData: async context => ({
    packages: context.query.author
      ? context.app.$axios.$get('https://api.npms.io/v2/search', {
          params: { q: `author:${context.query.author}` },
        })
        |> await
        |> property('results')
        |> map('package')
        |> map(async packageData => ({
          ...packageData,
          dependents:
            packageData.name |> npmDependants |> asyncIteratorToArray |> await,
          weeklyDownloads:
            npmPackageDownloads(packageData.name, 'last-week')
            |> await
            |> property('downloads'),
        }))
        |> Promise.all
        |> await
      : [],
  }),
  render() {
    return (
      <div>
        <section class="section">
          <h1 class="title is-size-2 has-text-centered has-text-primary">
            my-npm-stats
          </h1>
        </section>
        <section class="hero is-primary is-bold">
          <div class="hero-body">
            <div class="container">
              <div class="columns is-centered">
                <div class="column is-two-thirds">
                  <form method="get">
                    <b-field custom-class="is-medium" horizontal label="Author">
                      <b-input name="author" size="is-medium" type="text" />
                    </b-field>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="container">
            <div class="columns is-multiline">
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
}
</script>

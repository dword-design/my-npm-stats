<script>
import { map } from '@dword-design/functions'

export default {
  data: () => ({
    dependentsOpen: false,
  }),
  props: {
    value: {},
  },
  render() {
    return (
      <article class="card">
        <header class="card-header">
          <h3 class="card-header-title title">
            <a
              href={`https://www.npmjs.com/package/${this.value.name}`}
              target="_blank"
            >
              {this.value.name}
            </a>
          </h3>
        </header>
        <main class="card-content">
          <table class="table is-fullwidth">
            <tbody>
              <tr>
                <th style={{ width: '11rem' }}>Weekly downloads</th>
                <td>{this.value.weeklyDownloads}</td>
              </tr>
              <tr>
                <th>Dependents</th>
                <td>
                  <b-button
                    size="is-small"
                    type="is-light"
                    v-on:click={() =>
                      (this.dependentsOpen = !this.dependentsOpen)
                    }
                  >
                    {this.value.dependents.length}
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
          {this.dependentsOpen && (
            <div class="buttons">
              {this.value.dependents
                |> map(dependent => (
                  <a
                    class="button is-link"
                    href={`https://www.npmjs.com/package/${dependent}`}
                    target="_blank"
                  >
                    {dependent}
                  </a>
                ))}
            </div>
          )}
        </main>
      </article>
    )
  },
}
</script>

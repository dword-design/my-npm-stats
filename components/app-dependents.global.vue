<script>
import { map } from '@dword-design/functions'

export default {
  data: () => ({
    dependents: undefined,
  }),
  props: {
    value: {},
  },
  render() {
    return (
      <div>
        <h2 class="title">Dependents of {this.value.name}</h2>
        <div class="buttons" style={{ minHeight: '38px' }}>
          <b-loading active={this.dependents === undefined} />
          {this.dependents
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
      </div>
    )
  },
  watch: {
    value: {
      async handler() {
        this.dependents = await this.$axios.$get('/api/dependents', {
          params: {
            name: this.value.name,
          },
        })
      },
      immediate: true,
    },
  },
}
</script>

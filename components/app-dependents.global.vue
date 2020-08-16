<script>
import { map } from '@dword-design/functions'

export default {
  functional: true,
  props: {
    value: {},
  },
  render: context => (
    <div class="buttons">
      {context.props.value.dependents
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
  ),
}
</script>

<script>
export default {
  functional: true,
  props: {
    value: {},
  },
  render: context => (
    <tr>
      <td>
        <a
          href={`https://www.npmjs.com/package/${context.props.value.name}`}
          target="_blank"
        >
          {context.props.value.name}
        </a>
      </td>
      <td class="is-size-5">
        {context.props.value.weeklyDownloads.toLocaleString()}
      </td>
      <td>
        {context.props.value.dependentsCount > 0 ? (
          <b-button
            type="is-light"
            v-on:click={() =>
              context.parent.$buefy.modal.open({
                component: 'b-card-modal',
                hasModalCard: true,
                parent: context.parent,
                props: {
                  inner: 'app-dependents',
                  props: {
                    value: context.props.value,
                  },
                },
              })
            }
          >
            {context.props.value.dependentsCount}
          </b-button>
        ) : (
          <span
            style={{
              paddingLeft: '.75em',
              paddingRight: '.75em',
            }}
          >
            {context.props.value.dependentsCount}
          </span>
        )}
      </td>
    </tr>
  ),
}
</script>

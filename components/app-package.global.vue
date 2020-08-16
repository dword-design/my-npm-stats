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
      <td>{context.props.value.weeklyDownloads}</td>
      <td>
        <b-button
          size="is-small"
          type="is-light"
          v-on:click={() =>
            context.parent.$buefy.modal.open({
              component: 'b-card-modal',
              hasModalCard: true,
              props: {
                inner: 'app-dependents',
                props: {
                  value: context.props.value,
                },
              },
            })
          }
        >
          {context.props.value.dependents.length}
        </b-button>
      </td>
    </tr>
  ),
}
</script>

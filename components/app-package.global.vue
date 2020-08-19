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
        <b-button
          href={`https://www.npmjs.com/browse/depended/${context.props.value.name}`}
          tag="a"
          target="_blank"
          type="is-light"
        >
          {context.props.value.dependentsCount.toLocaleString()}
        </b-button>
      </td>
    </tr>
  ),
}
</script>

<template>
  <tr>
    <td>
      <a :href="`https://www.npmjs.com/package/${value.name}`" target="_blank">
        {{ value.name }}
      </a>
    </td>
    <td class="is-size-5">
      {{ value.weeklyDownloads.toLocaleString() }}
    </td>
    <td>
      <b-button
        :href="`https://www.npmjs.com/browse/depended/${value.name}`"
        tag="a"
        target="_blank"
        type="is-light"
      >
        {{ value.dependentsCount.toLocaleString() }}
      </b-button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    value: {},
  },
}
</script>

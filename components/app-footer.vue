<script>
export default {
  functional: true,
  render: context => (
    <footer {...context.data} class="footer">
      <div class="content has-text-centered">
        <p>
          Made with&nbsp;
          <b-icon aria-hidden="true" icon="heart-outline" size="is-small" />
          &nbsp;
          <span class="is-sr-only">love</span>
          by{' '}
          <a href="https://dword-design.de" target="_blank">
            Dword Design
          </a>
        </p>
      </div>
    </footer>
  ),
}
</script>

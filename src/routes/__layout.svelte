<script lang="ts" context="module">
  import { waitLocale } from 'svelte-i18n'
  import {init} from '$lib/i18n';

  export async function load() {
    init();
    await waitLocale();

    return {};
  }
</script>
<script lang="ts">
    import '../app.css';
</script>

<slot />

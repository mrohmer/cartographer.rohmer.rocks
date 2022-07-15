<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Loading from "../../lib/components/Loading.svelte";
  import {onMount} from 'svelte';
  import {startNewGame} from './_/utils/start-new-game';

  onMount(async () => {
    await startNewGame('normal');
  })
</script>

<Loading/>

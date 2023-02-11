<script lang="ts">
  import Loading from "../../_/components/Loading.svelte";
  import {onMount} from 'svelte';
  import {startNewGame} from '../_/utils/start-new-game';

  onMount(async () => {
    await startNewGame('wasteland');
  })
</script>

<Loading/>

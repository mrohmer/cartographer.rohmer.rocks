<script lang="ts">
  import type {Game} from '$lib/models/games/beear-and-bread/game';
  import Field from './Field.svelte';


  export let state: Game['state'];
</script>

<div class="w-full h-full">
    <div class="w-[500%] h-[500%] origin-top-left" style="transform: scale(0.2)">
        <Field {state} readonly />
    </div>
    <div class="absolute inset-0 w-full h-full"></div>
</div>

<script lang="ts">
  import Terrain from "./terrain/Terrain.svelte";
  import {_} from "svelte-i18n";

  export let state = false;
</script>

<style lang="postcss">
    .btn {
        @apply flex cursor-pointer items-center;
    }
    .terrain {
        @apply w-8 h-8 transition-all origin-center border border-black mr-3;
    }
    .btn:active .terrain {
        @apply scale-90;
    }
</style>
<div class="btn" on:click={() => (state = !state)}>
    <div class="terrain" class:opacity-50={!state}>
        <Terrain showDiagonalHelperLine={true} />
    </div>
    <div class="flex-1">
        {$_('pages.scorecard.btn.enable_diagonal_helper_lines')}
    </div>
</div>

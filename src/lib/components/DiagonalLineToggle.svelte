<script lang="ts">
  import Terrain from "./terrain/Terrain.svelte";

  export let state = false;
</script>

<style lang="postcss">
    .btn {
        @apply flex cursor-pointer items-center transition-opacity;
    }
    .terrain {
        @apply w-10 h-10 transition-transform origin-center border mr-3;
    }
    .btn:active .terrain {
        @apply scale-90;
    }
</style>
<div class="btn" on:click={() => (state = !state)} class:opacity-50={!state}>
    <div class="terrain">
        <Terrain showDiagonalHelperLine={true} />
    </div>
    <div class="flex-1">
        Enable Diagonal Helper Lines
    </div>
</div>

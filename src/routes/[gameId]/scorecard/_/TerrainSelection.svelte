<script lang="ts">
  import type {Terrain} from '$lib/models/terrain';
  import {buildableTerrains} from '$lib/models/terrain';
  import TerrainComp from '$lib/components/terrain/Terrain.svelte';
  import {createEventDispatcher} from 'svelte';
  import {_} from "svelte-i18n";

  const dispatch = createEventDispatcher();

  export let selection: Terrain | undefined;
  export let canPersist = false;
  export let width: number;
</script>

<style lang="postcss">
    .cell {
        @apply flex flex-col justify-center text-center border-2 h-full mr-2 w-1/12 cursor-pointer;
    }
</style>

<div class="flex my-2 justify-center" bind:clientWidth={width} style="height: {width / 11}px">
    {#each buildableTerrains as terrain}
        <div class="cell transition-all"
             class:border-black={selection === terrain}
             class:opacity-40={selection && selection !== terrain}
             on:click={() => dispatch('change', terrain !== selection ? terrain : undefined)}
        >
            <TerrainComp {terrain} />
        </div>
    {/each}
    <div class="flex-1"></div>
    <div>
        <button class="font-semibold py-3 px-1"
                disabled={!canPersist}
                class:opacity-50={!canPersist}
                class:cursor-not-allowed={!canPersist}
                on:click={() => canPersist && dispatch('persist')}
        >
            {$_('pages.scorecard.btn.persist')}
        </button>
    </div>
</div>

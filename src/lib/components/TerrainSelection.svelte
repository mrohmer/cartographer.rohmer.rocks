<script lang="ts">
  import type {Terrain} from '../models/terrain';
  import {buildableTerrains} from '../models/terrain';
  import TerrainComp from './terrain/Terrain.svelte';
  import {createEventDispatcher} from 'svelte';
  import Button from "./Button.svelte";

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
    <div>
        <Button disabled={canPersist} on:click={() => dispatch('persist')}>
            Persist
        </Button>
    </div>
</div>

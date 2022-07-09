<script lang="ts">
  import type {GameMap} from '../models/GameMap';
  import {createEventDispatcher} from 'svelte';
  import Terrain from "./terrain/Terrain.svelte";

  const dispatch = createEventDispatcher();

  export let map: GameMap;
  export let canSelect: boolean;

  let width: number;
</script>

<style lang="postcss">
    .row {
        @apply flex;
        height: calc((100% / 11) - (0.25rem / 11));
    }
    .row--border {
        @apply h-1;
    }
    .border {
        @apply w-1 h-1 border-r-2 border-b-2;
    }
    .border--vertical {
        @apply h-full;
    }
    .border--horizontal {
        width: calc((100% / 11) - (0.25rem / 11));
    }
    .border--even {
        @apply bg-gray-500;
    }

    .cell {
        @apply h-full border-r-2 border-b-2 overflow-hidden text-center h-full transition-colors;
        width: calc((100% / 11) - (0.25rem / 11));
    }
</style>

<div bind:clientWidth={width} style="height: {width}px">
    <div class="row row--border">
        <div class="border border--corner"></div>
        {#each Array(11) as row, i}
            <div class="border border--horizontal" class:border--even={i % 2 === 0}></div>
        {/each}
        <div class="border border--corner"></div>
    </div>

    {#each map as row, i}
        <div class="row">
            <div class="border border--vertical" class:border--even={i % 2 === 0}></div>
            {#each row as cell, j}
                <div class="cell"
                     class:cell--ruin={cell.isRuin}
                     class:cursor-pointer={canSelect && !['wasteland', 'mountain'].includes(cell.terrain)}
                     class:cursor-not-allowed={['wasteland', 'mountain'].includes(cell.terrain)}
                     on:click={() => dispatch('clickCell', {x: j, y: i})}
                >
                    <Terrain terrain={cell.terrain} isRuin={cell.isRuin} />
                </div>
            {/each}
            <div class="border border--vertical" class:border--even={i % 2 === 0}></div>
        </div>
    {/each}

    <div class="row row--border">
        <div class="border border--corner"></div>
        {#each Array(11) as row, i}
            <div class="border border--horizontal" class:border--even={i % 2 === 0}></div>
        {/each}
        <div class="border border--corner"></div>
    </div>
</div>


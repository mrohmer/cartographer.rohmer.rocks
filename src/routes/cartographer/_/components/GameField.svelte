<script lang="ts">
  import type {GameMap} from '$lib/models/game-map';
  import {createEventDispatcher} from 'svelte';
  import Terrain from "./terrain/Terrain.svelte";
  import type {TerrainAndEraser} from '$lib/models/terrain';

  const dispatch = createEventDispatcher();

  export let map: GameMap;
  export let currentSelectionMap: Partial<GameMap>;
  export let canSelect: boolean;
  export let showDiagonalHelperLines = false;
  export let showIcons = true;
  export let isEraser = false;

  const cellIsWastelandOrMountain = (y: number, x: number): boolean => ['mountain', 'wasteland'].includes(map?.[y]?.[x]?.terrain);
  const shouldCloseGapToRight = (y: number, x: number): boolean =>
    cellIsWastelandOrMountain(y, x) && cellIsWastelandOrMountain(y, x + 1);
  const shouldCloseGapToBottom = (y: number, x: number): boolean =>
    cellIsWastelandOrMountain(y, x) && cellIsWastelandOrMountain(y + 1, x);
  const shouldCloseGapToBottomRight = (y: number, x: number): boolean =>
    shouldCloseGapToRight(y, x)
    && shouldCloseGapToBottom(y, x)
    && cellIsWastelandOrMountain(y, x)
    && cellIsWastelandOrMountain(y + 1, x + 1);
  let width: number;

  const getTerrain = (mapTerrain: TerrainAndEraser, selectedTerrain: TerrainAndEraser): Terrain => {
    if (selectedTerrain === 'eraser') {
      return mapTerrain;
    }
    return selectedTerrain ?? mapTerrain;
  };
</script>

<style lang="postcss">
    .row {
        @apply flex;
        height: calc((100% / 11) - (0.25rem / 11));
    }

    .row--field-border {
        @apply h-1;
    }

    .field-border {
        @apply w-1 h-1 border-r-2 border-b-2;
    }

    .field-border--vertical {
        @apply h-full;
    }

    .field-border--horizontal {
        width: calc((100% / 11) - (0.25rem / 11));
    }

    .field-border--even {
        @apply bg-gray-500;
    }

    .cell {
        @apply h-full border-r-2 border-b-2 text-center h-full;
        width: calc((100% / 11) - (0.25rem / 11));
    }
</style>

<div bind:clientWidth={width} style="height: {width}px">
    <div class="row row--field-border">
        <div class="field-border field-border--corner"></div>
        {#each Array(11) as row, i}
            <div class="field-border field-border--horizontal" class:field-border--even={i % 2 === 0}></div>
        {/each}
        <div class="field-border field-border--corner"></div>
    </div>

    {#each map as row, i}
        <div class="row">
            <div class="field-border field-border--vertical" class:field-border--even={i % 2 === 0}></div>
            {#each row as cell, j}
                <div class="cell"
                     class:cursor-pointer={canSelect && !['wasteland', 'mountain'].includes(cell.terrain)}
                     class:cursor-not-allowed={!!cell.terrain === !isEraser || ['wasteland', 'mountain'].includes(cell.terrain)}
                     on:click={() => dispatch('clickCell', {x: j, y: i})}
                >
                    {#if shouldCloseGapToRight(i, j)}
                        <div class="w-1 h-full bg-wasteland absolute top-0 right-0 -mr-1"></div>
                    {/if}
                    {#if shouldCloseGapToBottom(i, j)}
                        <div class="w-full h-1 bg-wasteland absolute bottom-0 right-0 -mb-1"></div>
                    {/if}
                    {#if shouldCloseGapToBottomRight(i, j)}
                        <div class="w-1 h-1 bg-wasteland absolute bottom-0 right-0 -mb-1 -mr-1"></div>
                    {/if}

                    <div class="h-full w-full absolute bg-zinc-700 blur m-auto opacity-0"
                         class:opacity-50={!!currentSelectionMap?.[i]?.[j]?.terrain}
                         class:transition-opacity={!!currentSelectionMap?.[i]?.[j]?.terrain}
                    ></div>

                    <div class="h-full w-full transition-transform"
                         class:-translate-y-0.5={!!currentSelectionMap?.[i]?.[j]?.terrain}
                         class:-translate-x-0.5={!!currentSelectionMap?.[i]?.[j]?.terrain}
                    >
                        <Terrain terrain={getTerrain(cell?.terrain, currentSelectionMap?.[i]?.[j]?.terrain)}
                                 isRuin={cell.isRuin}
                                 showDiagonalHelperLine={showDiagonalHelperLines && i >= j}
                                 showIcon={showIcons}
                        />
                        <div class="h-full w-full absolute inset-0 border-zinc-800"
                             class:border={!!currentSelectionMap?.[i]?.[j]?.terrain}
                             class:transition-border-width={!!currentSelectionMap?.[i]?.[j]?.terrain}
                        >
                        </div>
                    </div>
                </div>
            {/each}
            <div class="field-border field-border--vertical" class:field-border--even={i % 2 === 0}></div>
        </div>
    {/each}

    <div class="row row--field-border">
        <div class="field-border field-border--corner"></div>
        {#each Array(11) as row, i}
            <div class="field-border field-border--horizontal" class:field-border--even={i % 2 === 0}></div>
        {/each}
        <div class="field-border field-border--corner"></div>
    </div>
</div>


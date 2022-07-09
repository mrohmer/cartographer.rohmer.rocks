<script lang="ts">
  import GameField from "$lib/components/GameField.svelte";
  import TerrainSelection from "../lib/components/TerrainSelection.svelte";
  import type {Terrain} from '../lib/models/Terrain';
  import {createGameMap} from '../lib/utils/create-game-map';
  import {onMount} from 'svelte';
  import type {GameMap} from '../lib/models/GameMap';
  import Button from "../lib/components/Button.svelte";

  let selection: Terrain = undefined;
  let map: GameMap;
  let mounted = false;

  const handleCellClick = ({detail: {x, y}}) => {
    if (
      !selection
      || !map[y]?.[x]
      || ['mountain', 'wasteland'].includes(map[y][x].terrain)
    ) {
      return;
    }
    map[y][x].terrain = map[y][x].terrain !== selection ? selection : undefined;
  };
  const handleEndGameClick = () => {
    localStorage.removeItem('map');
    map = undefined;
  }

  onMount(() => (mounted = true));

  $: {
    if (mounted) {
      if (map) {
        localStorage.setItem('map', JSON.stringify(map));
      } else {
        let tempMap = localStorage.getItem('map');
        if (tempMap) {
          map = JSON.parse(tempMap);
        }
      }
    }
    if (mounted && map) {
    }
  }
</script>

{#if map}
    <div class="max-w-[500px] mx-auto p-2">
        <TerrainSelection bind:selection={selection}/>
        <GameField {map} canSelect={!!selection} on:clickCell={handleCellClick}/>

        <div class="flex">
            <Button class="mt-4" on:click={() => handleEndGameClick()}>End Game</Button>
        </div>
    </div>
{:else}
    <h3>Start new Game</h3>
    <div class="flex">
        <Button class="block" on:click={() => (map = createGameMap())}>Normal Map</Button>
        <Button class="block" on:click={() => (map = createGameMap('wasteland'))}>Wasteland Map</Button>
    </div>
{/if}

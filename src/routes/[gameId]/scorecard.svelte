<script context="module" lang="ts">
  export const prerender = true;
</script>
<script lang="ts">
  import GameField from "$lib/components/GameField.svelte";
  import TerrainSelection from "$lib/components/TerrainSelection.svelte";
  import type {Terrain} from '$lib/models/Terrain';
  import {onMount} from 'svelte';
  import Button from "$lib/components/Button.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import {page} from '$app/stores';
  import {liveQuery} from 'dexie';
  import type {Observable} from 'dexie';
  import {gameDB} from '../../lib/db';
  import type {Game} from '../../lib/models/game';
  import {goto} from '$app/navigation';
  import type {GameMap} from '../../lib/models/game-map';

  let game: Observable<Game>;
  let mounted = false;

  const handleCellClick = async ({detail: {x, y}}) => {
    if (
      !$game?.currentRound?.selection
      || !!$game?.map[y]?.[x]?.terrain
    ) {
      return;
    }
    const map = $game.currentRound?.map ?? [];

    const included = map.find(cell => cell.x === x && cell.y === y);
    if (included) {
      map.splice(map.indexOf(included), 1);
    } else {
      map.push({x, y});
    }

    await gameDB.games.update($game.id, {
      currentRound: {
        ...($game.currentRound ?? {}),
        map,
      },
    });
  };
  const handleEndGameClick = () => gameDB.games.delete($game.id)
    .then(() => goto('/'));

  const handleChangeSelection = async (selection: Terrain) => {
    if (!selection && $game.currentRound?.map?.length) {
      // cannot deselect when map has members
      return
    }

    await gameDB.games.update($game.id, {
      currentRound: {
        ...($game.currentRound ?? {}),
        selection,
      },
    });
  }

  const buildCurrentSelectionMap = (game: Game): Partial<GameMap> => {
    if (!game) {
      return undefined;
    }
    const terrain = game.currentRound?.selection;
    const map = game.currentRound?.map ?? [];

    return map.reduce((curr, {y, x}) => ({
      ...curr,
      [y]: {
        ...(curr[y] ?? {}),
        [x]: {
          terrain,
        },
      },
    }), {} as Partial<GameMap>);
  }

  const handlePersistMap = async () => {
    if (!$game?.currentRound?.map?.length) {
      return;
    }

    const selectedMap = buildCurrentSelectionMap($game);

    const map = $game.map.map((row, y) => row.map((cell, x) => ({
      ...cell,
      terrain: selectedMap[y]?.[x]?.terrain ?? cell.terrain,
    })));

    await gameDB.games.update($game.id, {
      currentRound: undefined,
      map,
    });
  };


  let loading = true;

  onMount(() => (mounted = true));

  $: {
    if (mounted && $page?.params?.gameId && !isNaN(parseInt($page?.params?.gameId))) {
      game = liveQuery(() =>
        gameDB
          .games
          .get(Number($page.params.gameId))
          .then((data) => {
            loading = false;
            return data;
          })
      );
    }
  }

  $: currentSelectionMap = buildCurrentSelectionMap($game);
</script>

{#if loading && !isNaN(parseInt($page?.params?.gameId))}
    <Loading/>
{:else if $game}
    <div class="max-w-[500px] mx-auto p-2">
        <TerrainSelection selection={$game.currentRound?.selection}
                          on:change={({detail}) => handleChangeSelection(detail)}
                          on:persist={() => handlePersistMap()}/>
        <GameField map={$game.map} {currentSelectionMap} canSelect={!!$game.currentRound?.selection}
                   on:clickCell={handleCellClick}/>

        <div class="flex">
            <Button class="mt-4" on:click={() => handleEndGameClick()}>End Game</Button>
        </div>
    </div>
{:else}
    <div class="max-w-[500px] mx-auto p-2">
        <p>No game found</p>
    </div>
{/if}

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
  import Coins from "../../lib/components/coins/Coins.svelte";
  import type {GameRoundResult} from '../../lib/models/game-round-result';
  import Scores from "../../lib/components/scoring/Scores.svelte";

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
  const handleDeleteGameClick = () => gameDB.games.delete($game.id)
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
  const handleAdvanceToNextRoundClick = async () => {
    if (isFinished) {
      return;
    }

    await handlePersistMap();

    await gameDB.transaction('rw', gameDB.games, async () => {
      const g = await gameDB.games.get($game.id);

      const roundResults = g.roundResults ?? [];

      while (roundResults.length < (g.round ?? 0)) {
        roundResults.push({});
      }

      await gameDB.games.update(g.id, {
        roundResults,
        currentRound: undefined,
        round: (g.round ?? 0) + 1,
      });
    })
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
    if (!$game?.currentRound?.map?.length && !$game?.currentRound?.coin) {
      return;
    }

    const selectedMap = buildCurrentSelectionMap($game);

    const map = $game.map.map((row, y) => row.map((cell, x) => ({
      ...cell,
      terrain: selectedMap[y]?.[x]?.terrain ?? cell.terrain,
    })));

    const roundResults = [...($game.roundResults ?? []).map(round => ({...round}))];
    const round = $game.round ?? 0;

    console.log(round);

    if ($game.currentRound?.coin) {
      roundResults[round] = roundResults[round] ?? {coins: 0};
      const coins = roundResults[round].coins ?? 0;
      roundResults[round].coins = (typeof coins === 'number' && !isNaN(coins)? coins : 0) + 1;
    }

    await gameDB.games.update($game.id, {
      currentRound: undefined,
      roundResults: roundResults.length ? roundResults : undefined,
      map,
    });
  };
  const handleCoinToggle = () => {
    gameDB.games.update($game.id, {
      currentRound: {
        ...($game.currentRound ?? {}),
        coin: !$game.currentRound?.coin,
      },
    });
  }
  const handleResultChange = ({round, roundResult}: {round: number, roundResult: GameRoundResult}) => {
    const original = $game.roundResults ?? [];

    if (original.length < round - 1) {
      return; // dafuq
    }
    if (original.length < round) {
      original.push(roundResult);
    } else {
      original[round] = roundResult;
    }

    gameDB.games.update($game.id, {
      roundResults: original,
    });
  }

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
  $: currentMountainCoins = $game?.currentRound;
  $: currentResult = $game?.roundResults?.[$game?.round ?? 0];

  $: isFinished = $game?.round !== undefined && $game?.round > 4;
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

        <div class="my-2">
            <Coins coins={$game.roundResults?.map(r => r ?? ({})).map(({coins}) => typeof coins === 'number' && !isNaN(coins) ? coins : 0)} coin={$game?.currentRound?.coin}
                   round={$game.round} on:toggle={handleCoinToggle}/>
        </div>

        <div class="my-4">
            <Scores round={$game.round} roundResults={$game.roundResults} on:change={({detail}) => handleResultChange(detail)}/>
        </div>

        {isFinished ? 'Final Result' : `Round ${$game.round ?? 0}`}

        {#if !isFinished}
            <div class="mt-4">
                <Button on:click={handleAdvanceToNextRoundClick} disabled={currentResult?.points0 === undefined || currentResult.points1 === undefined}>
                    {$game.round > 2 ? 'Finish Game' : 'Advance to next Round'}
                </Button>
            </div>
        {/if}

        <div class="flex mt-20 py-20">
            <Button on:click={handleDeleteGameClick}>Delete Game</Button>
        </div>
    </div>
{:else}
    <div class="max-w-[500px] mx-auto p-2">
        <p>No game found</p>
    </div>
{/if}

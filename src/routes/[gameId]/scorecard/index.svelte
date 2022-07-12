<script context="module" lang="ts">
  export const prerender = true;
</script>
<script lang="ts">
  import GameField from "$lib/components/GameField.svelte";
  import TerrainSelection from "./_/TerrainSelection.svelte";
  import type {Terrain} from '$lib/models/Terrain';
  import {onMount} from 'svelte';
  import Loading from "$lib/components/Loading.svelte";
  import {page} from '$app/stores';
  import {liveQuery} from 'dexie';
  import type {Observable} from 'dexie';
  import {gameDB} from '$lib/db';
  import type {Game} from '$lib/models/game';
  import type {GameMap} from '$lib/models/game-map';
  import Coins from "$lib/components/coins/Coins.svelte";
  import type {GameRoundResult} from '$lib/models/game-round-result';
  import Scores from "$lib/components/scoring/Scores.svelte";
  import {countSurroundings, countUniqueSurroundings} from '$lib/utils/count-surroundings';
  import { _, isLoading as i18nLoading } from 'svelte-i18n';
  import Header from "./_/Header.svelte";

  const SEASON_MAP = ['spring', 'summer', 'autumn', 'winter'];

  let game: Observable<Game>;
  let mounted = false;

  let showDiagonalHelperLines = false;

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

    if ($game.currentRound?.coin) {
      roundResults[round] = roundResults[round] ?? {coins: 0};
      const coins = roundResults[round].coins ?? 0;
      roundResults[round].coins = (typeof coins === 'number' && !isNaN(coins) ? coins : 0) + 1;
    }

    const mountainsScored = roundResults?.filter((r, i) => r && i <= round).map(r => r?.mountainsScored ?? []).flat() ?? [];
    const unscoredMountains = findItemsWithTerrain(map, 'mountain')
      .filter(({x, y}) => !mountainsScored.find(({x: mx, y: my}) => mx === x && my === y))
      .filter(mountain => countSurroundings(map, mountain, 'NOT_EMPTY') === 4)
      .map(({x, y}) => ({x, y}))
    ;

    if (unscoredMountains.length) {
      roundResults[round] = roundResults[round] ?? {};
      roundResults[round].mountainsScored = [...(roundResults[round].mountainsScored ?? []), ...unscoredMountains];
    }

    const monsterPoints = getMonsterPoints(map);
    if (monsterPoints) {
      roundResults[round] = roundResults[round] ?? {};
      roundResults[round].monsterPoints = monsterPoints
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
  const handleResultChange = ({round, roundResult}: { round: number, roundResult: GameRoundResult }) => {
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

  const findItemsWithTerrain = (map: GameMap, terrain: Terrain): (Record<'x' | 'y', number> & Record<'terrain', Terrain>)[] => {
    return map
      .map((row, y) => row.map((cell, x) => ({
        x,
        y,
        terrain: cell.terrain,
      })))
      .flat()
      .filter(({terrain: t}) => t === terrain);
  }
  const getMonsterPoints = (map: GameMap): number => {
    if (!map) {
      return 0;
    }

    const monsterPositions = findItemsWithTerrain(map, 'monster');

    return countUniqueSurroundings(map, monsterPositions, undefined, {neglectOutOfBounds: true});
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
  $: season = !isFinished ? SEASON_MAP[$game?.round ?? 0] : undefined;
</script>

{#if $i18nLoading || loading && !isNaN(parseInt($page?.params?.gameId))}
    <Loading/>
{:else if $game}
    <Header round={$game.round}
            nextButtonDisabled={currentResult?.points0 === undefined || currentResult.points1 === undefined}
            bind:showDiagonalHelperLines={showDiagonalHelperLines}
            on:advance={handleAdvanceToNextRoundClick}
    >
        {#if isFinished}
            {$_('pages.scorecard.finished')}
        {:else}
            {$_(`pages.scorecard.seasons.${season}`)}
        {/if}
    </Header>
    <div class="max-w-[500px] mx-auto p-2">
        <TerrainSelection selection={$game.currentRound?.selection}
                          canPersist={!!$game?.currentRound?.map?.length || !!$game?.currentRound?.coin}
                          on:change={({detail}) => handleChangeSelection(detail)}
                          on:persist={() => handlePersistMap()}/>
        <GameField map={$game.map} {currentSelectionMap}
                   canSelect={!!$game.currentRound?.selection}
                   showDiagonalHelperLines={showDiagonalHelperLines}
                   on:clickCell={handleCellClick}/>

        <div class="my-2">
            <Coins coins={$game.roundResults?.map(r => r ?? ({})).map(({coins, mountainsScored}) => ({standard: typeof coins === 'number' && !isNaN(coins) ? coins : 0, mountain: mountainsScored?.length ?? 0}))}
                   coin={$game?.currentRound?.coin}
                   round={$game.round} on:toggle={handleCoinToggle}/>
        </div>

        <div class="my-4">
            <Scores round={$game.round} roundResults={$game.roundResults}
                    on:change={({detail}) => handleResultChange(detail)}/>
        </div>
    </div>
{:else}
    <div class="max-w-[500px] mx-auto p-2">
        <p>{$_('pages.scorecard.not_found')}</p>
    </div>
{/if}

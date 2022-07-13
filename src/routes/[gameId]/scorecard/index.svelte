<script context="module" lang="ts">
  export const prerender = true;
</script>
<script lang="ts">
  import GameField from "$lib/components/GameField.svelte";
  import TerrainSelection from "./_/components/TerrainSelection.svelte";
  import type {Terrain} from '$lib/models/Terrain';
  import {onMount} from 'svelte';
  import Loading from "$lib/components/Loading.svelte";
  import {page} from '$app/stores';
  import {liveQuery} from 'dexie';
  import type {Observable} from 'dexie';
  import {gameDB} from '$lib/db';
  import type {Game} from '$lib/models/game';
  import Coins from "./_/components/coins/Coins.svelte";
  import type {GameRoundResult} from '$lib/models/game-round-result';
  import Scores from "./_/components/scoring/Scores.svelte";
  import {_, isLoading as i18nLoading} from 'svelte-i18n';
  import Header from "./_/components/Header.svelte";
  import {buildCurrentSelectionMap} from './_/utils';
  import {persist,advanceToNextRound,toggleCoin,updateResult,changeSelection,toggleCellSelection} from './_/db';
  import SeasonBackground from "./_/components/SeasonBackground.svelte";

  const SEASON_MAP = ['spring', 'summer', 'autumn', 'winter'];

  let game: Observable<Game>;
  let mounted = false;

  let showDiagonalHelperLines = false;

  const handleCellClick = ({detail}) => $game.id ? toggleCellSelection($game.id, detail) : undefined;

  const handleChangeSelection = (selection: Terrain) => $game.id ? changeSelection($game.id, selection) : undefined;
  const handleAdvanceToNextRoundClick = () => isFinished || !$game.id ? undefined : advanceToNextRound($game.id);

  const handlePersistMap = () => $game.id ? persist($game.id) : undefined;

  const handleCoinToggle = () => $game.id ? toggleCoin($game.id) : undefined;

  const handleResultChange = ({round, roundResult}: { round: number, roundResult: GameRoundResult }) => $game.id ? updateResult($game.id, round, roundResult) : undefined;

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

  $: isFinished = $game?.round !== undefined && $game?.round > 3;
  $: season = !isFinished ? SEASON_MAP[$game?.round ?? 0] : undefined;
</script>

{#if $i18nLoading || loading && !isNaN(parseInt($page?.params?.gameId))}
    <Loading/>
{:else if $game}
    <SeasonBackground round={$game.round} />
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
        <GameField map={$game.map}
                   {currentSelectionMap}
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

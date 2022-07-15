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
  import {
    persist,
    advanceToNextRound,
    toggleCoin,
    updateResult,
    changeSelection,
    toggleCellSelection,
    updateInfo
  } from './_/db';
  import SeasonBackground from "./_/components/SeasonBackground.svelte";
  import Input from "$lib/components/Input.svelte";
  import {buildMap} from "../../../lib/utils/build-map";
  import {createGameMap} from "$lib/utils/create-game-map";
  import {buildableTerrains} from '../../../lib/models/terrain';

  const SEASON_MAP = ['spring', 'summer', 'autumn', 'winter'];

  let game: Observable<Game>;
  let mounted = false;

  let showDiagonalHelperLines = false;

  const handleCellClick = ({detail}) => $game.id ? toggleCellSelection($game.id, detail) : undefined;

  const handleChangeSelection = (selection: Terrain) => $game.id ? changeSelection($game.id, selection) : undefined;
  const handleAdvanceToNextRoundClick = () => isFinished || !$game.id ? undefined : advanceToNextRound($game.id);

  const handlePersistMap = () => $game.id ? persist($game.id) : undefined;

  const handleCoinToggle = () => $game.id ? toggleCoin($game.id) : undefined;

  const handleResultChange = ({
                                round,
                                roundResult
                              }: { round: number, roundResult: GameRoundResult }) => $game.id ? updateResult($game.id, round, roundResult) : undefined;


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

  $: currentSelectionMap = buildCurrentSelectionMap($game?.currentRound);
  $: currentMountainCoins = $game?.currentRound;
  $: currentResult = $game?.roundResults?.[$game?.round ?? 0];
  $: hasAnyBuildableTerrainsInMap = !!buildMap($game?.roundResults)?.some(row => row.some(cell => buildableTerrains.includes(cell.terrain)));

  $: isFinished = $game?.round !== undefined && $game?.round > 3;
  $: season = !isFinished ? SEASON_MAP[$game?.round ?? 0] : undefined;
</script>

{#if $i18nLoading || loading && !isNaN(parseInt($page?.params?.gameId))}
    <Loading/>
{:else if $game}
    <SeasonBackground round={$game.round}/>
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
        <div class="flex space-x-2 mb-5">
            <div class="flex-1">
                <Input id="name" value={$game.info?.name}
                       maxLength="50"
                       on:input={event => updateInfo($game.id, {name: event.target.value?.trim()})}>
                    {$_('pages.scorecard.inputs.name')}
                </Input>
            </div>
            <div class="flex-1">
                <Input id="title" value={$game.info?.title}
                       maxLength="50"
                       on:input={event => updateInfo($game.id, {title: event.target.value?.trim()})}>
                    {$_('pages.scorecard.inputs.title')}
                </Input>
            </div>
        </div>
        <div class="mb-5">
            <Input id="country" value={$game.info?.country}
                   maxLength="50"
                   on:input={event => updateInfo($game.id, {country: event.target.value?.trim()})}>
                {$_('pages.scorecard.inputs.country')}
            </Input>
        </div>

        <TerrainSelection selection={$game.currentRound?.selection}
                          canPersist={!!$game?.currentRound?.map?.length || !!$game?.currentRound?.coin}
                          hasSelectedCells={!!$game?.currentRound?.map?.length}
                          hasEraser={hasAnyBuildableTerrainsInMap}
                          on:change={({detail}) => handleChangeSelection(detail)}
                          on:persist={() => handlePersistMap()}/>
        <GameField map={buildMap($game.roundResults) ?? createGameMap($game.type)}
                   {currentSelectionMap}
                   canSelect={!!$game.currentRound?.selection}
                   showDiagonalHelperLines={showDiagonalHelperLines}
                   isEraser={$game.currentRound?.selection === 'eraser'}
                   on:clickCell={handleCellClick}/>

        <div class="my-2">
            <Coins coins={$game.roundResults?.map(r => r ?? ({})).map(({coins}) => ({normal: typeof coins?.normal === 'number' && !isNaN(coins?.normal) ? coins?.normal : 0, mountain: typeof coins?.mountain === 'number' && !isNaN(coins?.mountain) ? coins?.mountain : 0}))}
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

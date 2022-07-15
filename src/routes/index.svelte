<script context="module" lang="ts">
  export const prerender = true;
</script>
<script lang="ts">
  import {createGameMap} from '$lib/utils/create-game-map';
  import {onMount} from 'svelte';
  import Loading from "$lib/components/Loading.svelte";
  import {gameDB} from '$lib/db';
  import {goto} from '$app/navigation';
  import type {Observable} from 'dexie';
  import type {Game} from '$lib/models/game';
  import {liveQuery} from 'dexie';
  import {_, date, isLoading as i18nLoading} from 'svelte-i18n';
  import MiniMap from "./_/components/MiniMap.svelte";
  import MapButton from "./_/components/MapButton.svelte";
  import {buildMap} from "../lib/utils/build-map";

  let mounted = false;
  let games: Observable<Game[]>;

  let loading = true;
  let width = 0;

  onMount(() => (mounted = true));

  const handleNewGameClick = async (type: 'normal' | 'wasteland') => {
    switch (type) {
      case 'normal':
        await goto('/new');
        break;
      case 'wasteland':
        await goto('/new/wasteland');
        break;
    }
  }

  $: {
    if (mounted) {
      games = liveQuery(async () => {
        const result = await gameDB.games.toArray();
        loading = false;
        return result.sort((a, b) => +(b.updated ?? b.created) - +(a.updated ?? a.created));
      });
    }
  }
  $: viewportXs = width > 0 && width < 420;
</script>

{#if loading || $i18nLoading}
    <Loading/>
{:else}
    <div class="max-w-[500px] mx-auto" bind:clientWidth={width}>
        <div class="text-center font-cinzel uppercase mt-4 mb-8">
            <div class="inline-block">
                <div class="text-yellow-600">
                    <div class="text-xl text-left pl-[2.7rem] sm:pl-[5.4rem] -mb-[0.4rem]"
                         style="text-shadow: 1px  1px 1px black, 1px -1px 1px black, -1px  1px 1px black, -1px -1px 1px black;">{$_('game.article', {default: ''})}</div>
                    <div class="text-3xl sm:text-6xl"
                         style="text-shadow: 1px  1px 2px black, 1px -1px 2px black, -1px  1px 2px black, -1px -1px 2px black;">{$_('game.name', {default: ''})}</div>
                </div>
                <div class="flex items-center sm:-mt-[0.4rem]">
                    <div class="flex-1 h-px bg-black"></div>
                    <div class="mx-2 text-xs sm:text-normal">{$_('game.scorecard', {default: ''})}</div>
                    <div class="flex-1 h-px bg-black"></div>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <h2 class="text-center text-xl mb-2">{$_('pages.index.new_game.headline')}</h2>
            <div class="flex space-x-0.5">
                <div class="flex-1 transition-colors hover:bg-stone-200" class:p-3={!viewportXs} class:p-1={viewportXs}>
                    <MapButton on:click={() => handleNewGameClick('normal')}>
                        <div class:flex={!viewportXs} class:space-x-0.5={!viewportXs}
                             class:justify-center={!viewportXs}>
                            <div>
                                {$_('pages.index.new_game.btn.normal_map.title')}
                            </div>
                            <div class="font-extralight" class:text-xs={viewportXs}>
                                ({$_('pages.index.new_game.btn.normal_map.site')})
                            </div>
                        </div>
                    </MapButton>
                </div>
                <div class="flex-1 p-3 hover:bg-stone-200" class:p-3={!viewportXs} class:p-1={viewportXs}>
                    <MapButton type="wasteland" on:click={() => handleNewGameClick('wasteland')}>
                        <div class:flex={!viewportXs} class:space-x-0.5={!viewportXs}
                             class:justify-center={!viewportXs}>
                            <div>
                                {$_('pages.index.new_game.btn.wasteland_map.title')}
                            </div>
                            <div class="font-extralight" class:text-xs={viewportXs}>
                                ({$_('pages.index.new_game.btn.wasteland_map.site')})
                            </div>
                        </div>
                    </MapButton>
                </div>
            </div>
        </div>

        <div class="mt-10">
            <h2 class="text-center text-xl mb-2">{$_('pages.index.previous_games.headline')}</h2>
            {#if $games?.length}
                <div>
                    {#each $games as game}
                        <a class="flex p-1 items-center transition-colors hover:bg-stone-200"
                           href={`/${game.id}/scorecard`}>
                            <div class="w-[4.5rem] h-[4.5rem] mr-4">
                                <MiniMap map={buildMap(game.roundResults)}/>
                            </div>
                            <div class="flex-1 overflow-hidden">
                                <div class="text-xl font-light w-full text-ellipsis overflow-hidden">
                                    {#if game.info?.country?.trim()}
                                        {game.info?.country?.trim()}
                                    {:else}
                                        {$_('pages.index.previous_games.game')} {game.id}
                                    {/if}
                                </div>
                                <div class="text-xs font-extralight w-full text-ellipsis overflow-hidden">
                                    {$_('pages.index.previous_games.last_played')}: {$date(game.updated ?? game.created, {format: 'short'})}
                                    {#if game.info?.name?.trim() || game.info?.title?.trim()}
                                        {$_('pages.index.previous_games.as')}
                                        {game.info?.title?.trim() ?? ''}
                                        {game.info?.name?.trim() ?? ''}
                                    {/if}
                                </div>
                            </div>
                        </a>
                    {/each}
                </div>
            {:else}
                <div class="text-center text-stone-400 font-extralight">
                    <h3>{$_('pages.index.previous_games.empty.headline')}</h3>
                    <p class="text-xs mt-1">{$_('pages.index.previous_games.empty.text')}</p>
                </div>
            {/if}
        </div>
    </div>
{/if}

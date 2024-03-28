<script lang="ts">
  import {onMount} from 'svelte';
  import Loading from "./_/components/Loading.svelte";
  import {cartographerDB} from '$lib/db';
  import {goto} from '$app/navigation';
  import type {Observable} from 'dexie';
  import type {Game} from '$lib/models/games/cartographer/game';
  import {liveQuery} from 'dexie';
  import {_, date, isLoading as i18nLoading} from 'svelte-i18n';
  import MiniMap from "./_/components/MiniMap.svelte";
  import MapButton from "./_/components/MapButton.svelte";
  import {buildMap} from "$lib/utils/games/cartographer/build-map";
  import CartographerLogo from '$lib/components/games/cartographer/CartographerLogo.svelte';

  let mounted = false;
  let games: Observable<Game[]>;

  let loading = true;
  let width = 0;

  onMount(() => (mounted = true));

  const handleNewGameClick = async (type: 'normal' | 'wasteland') => {
    switch (type) {
      case 'normal':
        await goto('/cartographer/new');
        break;
      case 'wasteland':
        await goto('/cartographer/new/wasteland');
        break;
    }
  }

  $: {
    if (mounted) {
      games = liveQuery(async () => {
        const result = await cartographerDB.games.toArray();
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
        <div class="mt-4 mb-8">
            <CartographerLogo />
        </div>

        <div class="mt-5">
            <h2 class="text-center text-xl mb-2">{$_('games.cartographer.pages.index.new_game.headline')}</h2>
            <div class="flex space-x-0.5">
                <div class="flex-1 transition-colors hover:bg-stone-200" class:p-3={!viewportXs} class:p-1={viewportXs}>
                    <MapButton on:click={() => handleNewGameClick('normal')}>
                        <div class:flex={!viewportXs} class:space-x-0.5={!viewportXs}
                             class:justify-center={!viewportXs}>
                            <div>
                                {$_('games.cartographer.pages.index.new_game.btn.normal_map.title')}
                            </div>
                            <div class="font-extralight" class:text-xs={viewportXs}>
                                ({$_('games.cartographer.pages.index.new_game.btn.normal_map.site')})
                            </div>
                        </div>
                    </MapButton>
                </div>
                <div class="flex-1 p-3 hover:bg-stone-200" class:p-3={!viewportXs} class:p-1={viewportXs}>
                    <MapButton type="wasteland" on:click={() => handleNewGameClick('wasteland')}>
                        <div class:flex={!viewportXs} class:space-x-0.5={!viewportXs}
                             class:justify-center={!viewportXs}>
                            <div>
                                {$_('games.cartographer.pages.index.new_game.btn.wasteland_map.title')}
                            </div>
                            <div class="font-extralight" class:text-xs={viewportXs}>
                                ({$_('games.cartographer.pages.index.new_game.btn.wasteland_map.site')})
                            </div>
                        </div>
                    </MapButton>
                </div>
            </div>
        </div>

        <div class="mt-10">
            <h2 class="text-center text-xl mb-2">{$_('games.cartographer.pages.index.previous_games.headline')}</h2>
            {#if $games?.length}
                <div>
                    {#each $games as game}
                        <a class="flex p-1 items-center transition-colors hover:bg-stone-200"
                           href={`/cartographer/${game.id}/scorecard`}>
                            <div class="w-[4.5rem] h-[4.5rem] mr-4">
                                <MiniMap map={buildMap(game.roundResults)}/>
                            </div>
                            <div class="flex-1 overflow-hidden">
                                <div class="text-xl font-light w-full text-ellipsis overflow-hidden">
                                    {#if game.info?.country?.trim()}
                                        {game.info?.country?.trim()}
                                    {:else}
                                        {$_('games.cartographer.pages.index.previous_games.game')} {game.id}
                                    {/if}
                                </div>
                                <div class="text-xs font-extralight w-full text-ellipsis overflow-hidden">
                                    {$_('games.cartographer.pages.index.previous_games.last_played')}: {$date(game.updated ?? game.created, {format: 'short'})}
                                    {#if game.info?.name?.trim() || game.info?.title?.trim()}
                                        {$_('games.cartographer.pages.index.previous_games.as')}
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
                    <h3>{$_('games.cartographer.pages.index.previous_games.empty.headline')}</h3>
                    <p class="text-xs mt-1">{$_('games.cartographer.pages.index.previous_games.empty.text')}</p>
                </div>
            {/if}
        </div>
    </div>
{/if}

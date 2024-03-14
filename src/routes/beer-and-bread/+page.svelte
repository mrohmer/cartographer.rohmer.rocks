<script lang="ts">
  import {beerAndBreadDb} from '$lib/db/games/beer-and-bread.db';
  import {goto} from '$app/navigation';
  import {liveQuery, type Observable} from 'dexie';
  import {browser} from '$app/environment';
  import type {Game} from '$lib/models/games/beear-and-bread/game';
  import {_, date, isLoading as i18nLoading} from 'svelte-i18n';
  import MiniField from './_/components/MiniField.svelte';
  import {add} from './_/utils/add';

  let newGameLoading = false;
  let games: Observable<Game[]>
  let loading = true;

  export const handleNewGame = async () => {
    if (newGameLoading) {
      return
    }
    newGameLoading = true;

    const gameId = await beerAndBreadDb.games.add({
      state: [{}, {}]
    } as any);

    await goto(`/beer-and-bread/${gameId}/scorecard`);
  }


  $: {
    if (browser) {
      games = liveQuery(async () => {
          const result = await beerAndBreadDb
            .games
            .toArray()

          loading = false;
          return result.sort((a, b) => +(b.updated ?? b.created) - +(a.updated ?? a.created));
        }
      );
    }
  }
</script>

{#if $i18nLoading || loading}
    <div>Loading...</div>
{:else}
    <div class="max-w-[500px] mx-auto flex flex-col gap-5">
        <button on:click={handleNewGame}>
            neues spiel
        </button>

        {#if $games?.length}
            <div class="flex flex-col gap-2">
                {#each $games as game (game.id)}
                    <a class="flex gap-2" href="/beer-and-bread/{game.id}/scorecard">
                        <div class="w-[4.5rem] h-[4.5rem]">
                            <MiniField state={game.state}/>
                        </div>
                        <div class="flex-1">
                            <div class="text-xl font-light w-full text-ellipsis overflow-hidden flex gap-2">
                                {#each game.state as player, index}
                                    <div>
                                        {player.name ?? `Player ${index + 1}`}: {add(player.beer, player.beerAddition, player.bread, player.breadAddition)}
                                    </div>
                                {/each}
                            </div>
                            <div class="text-xs font-extralight w-full text-ellipsis overflow-hidden">
                                {$_('games.cartographer.pages.index.previous_games.last_played')}
                                : {$date(game.updated ?? game.created, {format: 'short'})}
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    </div>
{/if}

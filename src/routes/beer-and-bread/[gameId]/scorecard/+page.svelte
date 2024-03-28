<script lang="ts">
  import {liveQuery, type Observable} from 'dexie';
  import {page} from '$app/stores';
  import {browser} from '$app/environment';
  import {beerAndBreadDb} from '$lib/db/games/beer-and-bread.db';
  import type {Game} from '$lib/models/games/beear-and-bread/game';
  import {_, date, isLoading as i18nLoading} from 'svelte-i18n';
  import Field from '../../_/components/Field.svelte';
  import Header from '../../_/components/Header.svelte';
  import {faTrash as trashIcon} from '@fortawesome/free-solid-svg-icons/faTrash';
  import Icon from '$lib/components/Icon.svelte';
  import {goto} from '$app/navigation';

  let loading = true;
  let game: Observable<Game|undefined>;

  const handleChange = async ({detail: state}: Record<'detail', Game['state']>) => {
    await beerAndBreadDb.games.update(+$page.params.gameId, {
      state
    });
  }
  const handleDeleteGame = async () => {
    if (confirm($_('games.cartographer.pages.scorecard.confirm_delete_game'))) {
      await beerAndBreadDb.games.delete(+$page.params.gameId);
      await goto('/beer-and-bread');
    }
  }

  $: {
      if (browser && $page?.params?.gameId && !isNaN(parseInt($page?.params?.gameId))) {
        game = liveQuery(() =>
          beerAndBreadDb
            .games
            .get(+$page.params.gameId)
            .then((data) => {
              loading = false;
              return data;
            })
        );
      }
    }
</script>


{#if $i18nLoading || loading}
  <div>Loading...</div>
{:else if $game}
  <Header backHref="/beer-and-bread">
    <div class="leading-6">
      <div>
        Beer and Bread
      </div>
      <div class="text-[10px] leading-3 text-neutral-500">
        {$_('games.cartographer.pages.index.previous_games.last_played')}: {$date($game.updated ?? $game.created, {format: 'short'})}
      </div>
    </div>

    <div slot="menu" class="px-3 py-2">
      <button class="w-full py-1 text-left flex items-baseline" on:click={handleDeleteGame}>
        <div class="w-8 text-center mr-3">
          <Icon icon={trashIcon}/>
        </div>
        <div class="flex-1">
          {$_('games.cartographer.pages.scorecard.btn.delete_game')}
        </div>
      </button>
    </div>
  </Header>
  <div class="max-w-[500px] mx-auto my-4">
    <Field state={$game.state} on:change={handleChange} />
  </div>
{/if}

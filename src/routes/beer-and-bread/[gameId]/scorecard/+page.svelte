<script lang="ts">
  import {liveQuery, type Observable} from 'dexie';
  import {page} from '$app/stores';
  import {browser} from '$app/environment';
  import {beerAndBreadDb} from '$lib/db/games/beer-and-bread.db';
  import type {Game} from '$lib/models/games/beear-and-bread/game';
  import {isLoading as i18nLoading} from 'svelte-i18n';
  import Field from '../../_/components/Field.svelte';

  let loading = true;
  let game: Observable<Game|undefined>;

  const handleChange = async ({detail: state}: Record<'detail', Game['state']>) => {
    await beerAndBreadDb.games.update(+$page.params.gameId, {
      state
    });
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
  <div class="max-w-[500px] mx-auto">
    <Field state={$game.state} on:change={handleChange} />
  </div>
{/if}

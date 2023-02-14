<script lang="ts">
  import type {DorfromantikCampaign} from '$lib/models/games/dorfromantik/campaign';
  import type {DorfromantikGame} from '$lib/models/games/dorfromantik/game';
  import TextInput from '$lib/components/controls/input/TextInput.svelte';
  import {page} from '$app/stores';
  import {dorfromantikDB} from '$lib/db';
  import deepmerge from 'deepmerge';
  import {joinLast} from '$lib/utils/join-last';
  import {date} from 'svelte-i18n';
  import TopResults from './_/components/TopResults.svelte';
  import UnlockedResults from './_/components/UnlockedResults.svelte';
  import ExpansionPanel from '$lib/components/ExpansionPanel.svelte';
  import {sum} from '$lib/utils/games/dorfromantik/calc-game-results';
  import {goto} from '$app/navigation';
  import {liveQuery} from 'dexie';
  import {browser} from '$app/environment';
  import {calcGameResults} from '$lib/utils/games/dorfromantik/calc-game-results';

  export let data: Record<'campaign', DorfromantikCampaign> & Record<'game', DorfromantikGame>;

  let lastUpdate = +new Date();
  const update = async () => {
    await dorfromantikDB.games.update(+$page.params.gameId, game);
    lastUpdate = +new Date();
    game = {
      ...game,
    };
  }

  let game: DorfromantikGame;
  const resetGame = (d) => game = deepmerge(
    {
      results: {
        orders: {},
        flags: {},
        longest: {},
        unlocked: {},
      },
    },
    d ?? {}
  );
  const deleteGame = async () => {
    await dorfromantikDB.games.delete(+$page.params.gameId);
    await goto(`/dorfromantik/campaign/${$page.params.campaignId}`)
  }

  $: nbr = browser
    ? liveQuery(async () => {
      const items = await dorfromantikDB.games.where({campaignId: +$page.params.campaignId}).toArray();
      const index = items
        .sort(({id: a}, {id: b}) => Math.sign(b - a))
        .findIndex(({id}) => id === +$page.params.gameId)

      return items.length - index;
    })
    : undefined;
  $: campaign = data.campaign ?? {};
  $: resetGame(data.game);
  $: total = lastUpdate && calcGameResults(game?.results);
</script>

<a href="/dorfromantik/campaign/{$page.params.campaignId}" class="block mb-3">
    &lt; Zurück zur Kampagne
</a>

<div class="mb-3">
    <ExpansionPanel>
        <svelte:fragment slot="title">Spieler</svelte:fragment>
        <div>
            {#if game.players}
                {#each game.players as player, index}
                    <TextInput id="player-{index}" bind:value={player} on:input={update}></TextInput>
                {/each}
                <div on:click={() => game.players = [...(game.players ?? []), '']}>Add player</div>
            {/if}
        </div>
    </ExpansionPanel>
</div>

{#if game.results?.orders}
    <div class="mb-3 p-2">
        <div class="text-lg">Punkte</div>

        <div class="p-2 border border-gray-300">
            <TopResults results={game.results}
                        number={nbr ? $nbr : 0}
                        totalOrders={total.totalOrders}
                        totalFlagsAndLongest={total.totalFlagsAndLongest}
                        on:input={update}
            />

            <hr class="my-2">
            <div>
                <div>Freigespielt</div>
                <UnlockedResults results={game.results} totalUnlocked={total.totalUnlocked}
                                 on:input={update}
                />
            </div>

            <hr class="my-2">

            <div class="flex gap-2 items-center">
                <div class="flex-1">
                    <div>Mitspielende:</div>
                    <div>{joinLast(game.players?.sort())}</div>
                </div>
                <div class="px-2">
                    <div>Datum:</div>
                    <div>{$date(game.created)}</div>
                </div>
                <div class="text-3xl">
                    Ergebnis:
                </div>
                <div class="w-12 text-2xl">
                    {total.total}
                </div>
            </div>
        </div>
    </div>
{/if}

<button on:click={deleteGame}>löschen</button>

<script lang="ts">
  import type {DorfromantikCampaign} from '$lib/models/games/dorfromantik/campaign';
  import TextInput from '$lib/components/controls/input/TextInput.svelte';
  import {_} from 'svelte-i18n';
  import {dorfromantikDB} from '$lib/db';
  import {page} from '$app/stores';
  import type {Observable} from 'dexie';
  import type {DorfromantikGame} from '$lib/models/games/dorfromantik/game';
  import {browser} from '$app/environment';
  import {liveQuery} from 'dexie';
  import {goto} from '$app/navigation';
  import {calcGameResults} from '$lib/utils/games/dorfromantik/calc-game-results.js';
  import ExpansionPanel from '$lib/components/ExpansionPanel.svelte';

  export let data: Record<'campaign', DorfromantikCampaign | undefined>;

  let games: Observable<DorfromantikGame> | undefined;

  const update = () => dorfromantikDB.campaigns.update(+$page.params.campaignId, campaign);

  const startGame = async () => dorfromantikDB.games.add({
    campaignId: +$page.params.campaignId,
    number: (await dorfromantikDB.games.where({campaignId: +$page.params.campaignId}).count()),
    players: campaign.players ?? []
  });
  const deleteCampaign = async () => {
    await dorfromantikDB.campaigns.delete(+$page.params.campaignId);
    await goto('/dorfromantik');
  }

  $: campaign = data.campaign ?? {};
  $: games = browser
    ? liveQuery(async () => {
      const items = await dorfromantikDB.games.where({campaignId: +$page.params.campaignId}).toArray();
      return items
        .sort(({id: a}, {id: b}) => Math.sign(b - a))
    })
    : undefined;
</script>

<div class="flex flex-col gap-y-3">

    <a href="/dorfromantik" class="block">
        &lt; Zurück zur Übersicht
    </a>

    <div>
        <TextInput id="name" bind:value={campaign.name} on:input={update}>
            Name
        </TextInput>

        <div>
            {$_('games.dorfromantik.pages.index.campaigns.details.last_played', {values: {date: campaign.updated ?? campaign.created}})}
        </div>

        <div>
            <ExpansionPanel>
                <svelte:fragment slot="title">
                    Spieler
                </svelte:fragment>
                {#if campaign.players}
                    {#each campaign.players as player, index}
                        <TextInput id="player-{index}" bind:value={player} on:input={update}>
                            Spieler {index + 1}
                        </TextInput>
                    {/each}
                    <div on:click={() => campaign.players = [...(campaign.players ?? []), '']}>Add player</div>
                {/if}
            </ExpansionPanel>
        </div>
    </div>

    <div>
        <h2>Erfolge</h2>
        <a href="/dorfromantik/campaign/{+$page.params.campaignId}/achievements/campaign-path" class="block">Kampagnenblatt</a>
        <a href="/dorfromantik/campaign/{+$page.params.campaignId}/achievements/boxes" class="block">Schachteln</a>
    </div>
    <div>
        <a href="/dorfromantik/campaign/{+$page.params.campaignId}/campaign-path" class="block">
            Kampagnenblatt
        </a>
    </div>
    <div>
        <a href="/dorfromantik/campaign/{+$page.params.campaignId}/results" class="block">
            Ergebnisse
        </a>
    </div>
    <div>
        <h2>Spiele</h2>
        <div>
            <button on:click={startGame} class="block mb-2">Neues Spiel starten</button>
            {#if games && $games?.length}
                {#each $games as game, index}
                    <a href="/dorfromantik/campaign/{+$page.params.campaignId}/game/{game.id}"
                       class="block mb-2"
                    >
                        <div class="text-xl">
                            Spiel {$games.length - index}
                        </div>
                        <div>
                            Punkte: {calcGameResults(game.results).total}
                        </div>
                    </a>
                {/each}
            {/if}
        </div>

        <button on:click={deleteCampaign}>löschen</button>
    </div>
</div>

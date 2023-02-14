<script lang="ts">
  import {page} from '$app/stores';
  import CampaignPathAchievements from './_/components/CampaignPathAchievements.svelte';
  import type {DorfromantikCampaign} from '$lib/models/games/dorfromantik/campaign';
  import {browser} from '$app/environment';
  import {liveQuery} from 'dexie';
  import {dorfromantikDB} from '$lib/db';
  import deepmerge from 'deepmerge';
  import BoxAchievements from './_/components/BoxAchievements.svelte';

  export let data: Record<'campaign', DorfromantikCampaign>;

  let results: Pick<DorfromantikCampaign, 'campaignPathAchievements'|'boxAchievements'> = {};
  const resetAchievements = (d: DorfromantikCampaign|undefined) => results = ({
    campaignPathAchievements: d?.campaignPathAchievements ?? {},
    boxAchievements: d?.boxAchievements ?? {},
  });

  const update = () => dorfromantikDB.campaigns.update(+$page.params.campaignId, results);

  $: resetAchievements(data?.campaign);
  $: gameCount = browser && $page.params.campaignId
    ? liveQuery(() => dorfromantikDB.games.where({campaignId: +$page.params.campaignId}).count())
    : undefined;
  $: currentGame = (gameCount ? $gameCount : undefined) ?? 1;
</script>

<a href="/dorfromantik/campaign/{$page.params.campaignId}" class="block mb-3">
    &lt; Zurück zur Kampagne
</a>

<h1>{$page.params.achievementType === 'campaign-path' ? 'Kampagnenblatt' : 'Schachteln'}</h1>

{#if $page.params.achievementType === 'campaign-path'}
    <CampaignPathAchievements {currentGame} bind:state={results.campaignPathAchievements} on:change={update} />
{:else }
    <BoxAchievements {currentGame} bind:state={results.boxAchievements} on:change={update}/>
{/if}

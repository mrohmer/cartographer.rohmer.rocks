<script lang="ts">
  import {page} from '$app/stores';
  import CampaignPathAchievements from './_/components/CampaignPathAchievements.svelte';
  import type {DorfromantikCampaign} from '$lib/models/games/dorfromantik/campaign';
  import {browser} from '$app/environment';
  import {liveQuery} from 'dexie';
  import {dorfromantikDB} from '$lib/db';
  import BoxAchievements from './_/components/BoxAchievements.svelte';

  export let data: Record<'campaign', DorfromantikCampaign>;

  let results: Pick<DorfromantikCampaign, 'campaignPathAchievements' | 'boxAchievements'> = {};

  const resetAchievements = (d: DorfromantikCampaign | undefined) => results = ({
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

<div class="flex flex-col gap-5">
    <div>
        <h2 class="text-xl pb-1 mb-2">
            Kampagnenblatt
            <div class="absolute bg-dorfromantik-blue -left-1.5 bottom-0 w-10 h-px"></div>
        </h2>
        <CampaignPathAchievements {currentGame} bind:state={results.campaignPathAchievements} on:change={update}/>
    </div>
    <div>
        <h2 class="text-xl pb-1 mb-2">
            Schachteln
            <div class="absolute bg-dorfromantik-blue -left-1.5 bottom-0 w-10 h-px"></div>
        </h2>
        <BoxAchievements {currentGame} bind:state={results.boxAchievements} on:change={update}/>
    </div>
</div>

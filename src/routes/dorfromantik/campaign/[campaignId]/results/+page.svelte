<script lang="ts">
  import {liveQuery} from 'dexie';
  import {browser} from '$app/environment';
  import {dorfromantikDB} from '$lib/db/index.js';
  import {page} from '$app/stores';
  import {_} from 'svelte-i18n';
  import {groupGamesByPointGroups, groups} from '$lib/utils/games/dorfromantik/group-games-by-point-groups';


  $: groupedGames = browser
    ? liveQuery(async () => {
      const items = await dorfromantikDB.games.where({campaignId: +$page.params.campaignId}).toArray();
      return groupGamesByPointGroups(items)
    })
    : undefined;
  $: groupedGames && console.log('$groupedGames', $groupedGames);
</script>

<a href="/dorfromantik/campaign/{$page.params.campaignId}" class="block mb-3">
    &lt; Zurück zur Kampagne
</a>

<div>
    <div class="flex gap-1">
        <div class="flex-1">
            Eure Ergebnisse
        </div>
        <div class="border-black border-l"></div>
        <div class="w-8 text-center">X</div>
        <div class="border-black border-l"></div>
        <div class="w-20 text-center">Spiel</div>
    </div>
    {#each Object.entries(groups).reverse() as [points, checks]}
        <div class="flex gap-1">
            <div class="w-10 text-right">
                {+points === 0 ? '0-99' : points}
            </div>
            <div class="flex-1">
                {$_(`games.dorfromantik.pages.campaign_results.steps.${points}`)}
            </div>
            <div class="border-black border-l"></div>
            <div class="w-8 text-right">
                {checks} X
            </div>
            <div class="border-black border-l"></div>
            <div class="w-20 text-center">
                {#if groupedGames}
                    {$groupedGames?.[points]?.join('/') ?? ''}
                {/if}
            </div>
        </div>
    {/each}
</div>

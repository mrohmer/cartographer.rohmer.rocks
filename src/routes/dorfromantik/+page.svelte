<script lang="ts">
  import {_} from "svelte-i18n";
  import type {Observable} from "dexie";
  import type {DorfromantikCampaign} from "$lib/models/games/dorfromantik/campaign";
  import {browser} from "$app/environment";
  import {liveQuery} from "dexie";
  import {dorfromantikDB} from "$lib/db";
  import {joinLast} from '$lib/utils/join-last';
  import {faChevronRight as rightIcon} from '@fortawesome/free-solid-svg-icons/faChevronRight';
  import Icon from '$lib/components/Icon.svelte';


  let campaigns: Observable<DorfromantikCampaign[]> | undefined = browser
    ? liveQuery(
      async () => {
        const results = await dorfromantikDB.campaigns.toArray();
        return results
          .sort((a, b) => {
            const v1 = a.updated ?? a.created;
            const v2 = b.updated ?? b.created;
            return v1 < v2 ? 1 : -1;
          })
      })
    : undefined;
</script>

<div class="max-w-[500px] mx-auto py-2">
    <h1 class="py-5 px-10 rounded-xl bg-dorfromantik-blue text-center text-white mb-10">
        <div class="text-5xl">DORF</div>
        <div class="text-2xl">ROMANTIK</div>
        <div class="text-xs">DAS BRETTSPIEL</div>
    </h1>

    <div class="mb-10">
        <a href="/dorfromantik/campaign/new"
           class="border border-dorfromantik-blue rounded text-dorfromantik-blue px-8 py-3 mx-auto block w-fit">
            {$_('games.dorfromantik.pages.index.campaigns.start')}
        </a>
    </div>
    <div>
        <h2 class="text-2xl mb-2 text-center">
            {$_('games.dorfromantik.pages.index.campaigns.headline')}
        </h2>

        {#if !campaigns || !$campaigns}
            <div>loading...</div>
        {:else if $campaigns?.length}
            <div class="flex flex-col gap-y-2">
                {#each $campaigns as campaign}
                    <a href="/dorfromantik/campaign/{campaign.id}" class="block rounded border border-gray-300 px-5 py-3 flex items-center transition-transform hover:scale-[1.02] gap-1">
                        <div class="flex-1">
                            <div class="text-xl">
                                {campaign.name ?? $_('games.dorfromantik.pages.index.campaigns.details.fallback_name', {values: {key: campaign.id + 1}})}
                            </div>
                            <div class="text-xs">
                                {$_('games.dorfromantik.pages.index.campaigns.details.last_played', {values: {date: campaign.updated ?? campaign.created}})}
                            </div>
                            <div class="text-xs">
                                {$_('games.dorfromantik.pages.index.campaigns.details.with', {values: {players: joinLast(campaign.players)}})}
                            </div>
                        </div>
                        <div class="">
                            <Icon icon={rightIcon}/>
                        </div>
                    </a>
                {/each}
            </div>
        {:else}
            {$_('games.dorfromantik.pages.index.campaigns.empty')}
        {/if}
    </div>

</div>


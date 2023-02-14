<script lang="ts">
  import {_} from "svelte-i18n";
  import type {Observable} from "dexie";
  import type {DorfromantikCampaign} from "$lib/models/games/dorfromantik/campaign";
  import {browser} from "$app/environment";
  import {liveQuery} from "dexie";
  import {dorfromantikDB} from "$lib/db";
  import {joinLast} from '$lib/utils/join-last';

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

<h1>
    {$_('games.dorfromantik.game')}
</h1>

<div class="mb-3">
    <a href="/dorfromantik/campaign/new">
        {$_('games.dorfromantik.pages.index.campaigns.start')}
    </a>
</div>
<div>
    <h2 class="text-xl mb-1">
        {$_('games.dorfromantik.pages.index.campaigns.headline')}
    </h2>

    {#if !campaigns || !$campaigns}
        <div>loading...</div>
    {:else if $campaigns?.length}
        <div class="flex flex-col gap-y-2">

            {#each $campaigns as campaign}
                <a href="/dorfromantik/campaign/{campaign.id}">
                    <div>
                        <div>
                            {campaign.name ?? $_('games.dorfromantik.pages.index.campaigns.details.fallback_name', {values: {key: campaign.id + 1}})}
                        </div>
                        <div>
                            {$_('games.dorfromantik.pages.index.campaigns.details.last_played', {values: {date: campaign.updated ?? campaign.created}})}
                        </div>
                        <div>
                            {$_('games.dorfromantik.pages.index.campaigns.details.with', {values: {players: joinLast(campaign.players)}})}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {:else}
        {$_('games.dorfromantik.pages.index.campaigns.empty')}
    {/if}
</div>



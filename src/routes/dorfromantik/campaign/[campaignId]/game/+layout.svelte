<script lang="ts">
  import Tabs from "../_/componets/tabs/Tabs.svelte";
  import Tab from "../_/componets/tabs/Tab.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import {faPlus as plusIcon} from '@fortawesome/free-solid-svg-icons/faPlus';
  import {browser} from "$app/environment";
  import {liveQuery} from "dexie";
  import {page} from "$app/stores";
  import {dorfromantikDB} from '$lib/db';

  $: games = browser
    ? liveQuery(async () => {
      const items = await dorfromantikDB.games.where({campaignId: +$page.params.campaignId}).toArray();
      return items
        .sort(({id: a}, {id: b}) => Math.sign(b - a))
    })
    : undefined;
</script>

<div class="-mt-5 mb-3">
    <Tabs size="sm">
        <Tab href="/dorfromantik/campaign/{$page.params.campaignId}/game/new"><Icon icon={plusIcon} /></Tab>
        {#if games && $games?.length}
            {#each $games as game, index}
                <Tab href="/dorfromantik/campaign/{$page.params.campaignId}/game/{game.id}" active={game.id === +$page.params.gameId}>
                    Runde {$games.length - index}
                </Tab>
            {/each}
        {/if}
    </Tabs>
</div>

<slot />

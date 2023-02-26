<script lang="ts">
  import {faChevronLeft as leftIcon} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
  import Icon from '$lib/components/Icon.svelte';
  import {page} from '$app/stores';
  import Tabs from './_/componets/tabs/Tabs.svelte';
  import Tab from './_/componets/tabs/Tab.svelte';
</script>

<div class="flex items-center gap-1 mb-5">
    <a href="/dorfromantik" class="px-1 -ml-1">
        <Icon icon={leftIcon}/>
    </a>
    <div class="flex flex-1 gap-1 gap-1">
        <Tabs>
            <Tab href="/dorfromantik/campaign/{$page.params.campaignId}" active={$page.route.id === '/dorfromantik/campaign/[campaignId]'}>
                Übersicht
            </Tab>
            <Tab href="/dorfromantik/campaign/{$page.params.campaignId}/campaign-path"
               active={$page.route.id === '/dorfromantik/campaign/[campaignId]/campaign-path'}
            >
                Kampagnenblatt
            </Tab>
            <Tab href="/dorfromantik/campaign/{$page.params.campaignId}/achievements"
                 active={$page.route.id === '/dorfromantik/campaign/[campaignId]/achievements'}
            >
                Erfolge
            </Tab>
            <Tab href="/dorfromantik/campaign/{$page.params.campaignId}/game"
               active={$page.route.id.startsWith('/dorfromantik/campaign/[campaignId]/game')}
            >
                Spiele
            </Tab>
        </Tabs>
    </div>
</div>

<slot/>

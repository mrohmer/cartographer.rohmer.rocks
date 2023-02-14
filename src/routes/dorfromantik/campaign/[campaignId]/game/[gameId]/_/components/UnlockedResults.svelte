<script lang="ts">
  import type {DorfromantikGame} from '$lib/models/games/dorfromantik/game';
  import UnlockedResultsItem from './UnlockedResultsItem.svelte';
  import type {DorfromantikCampaign} from '$lib/models/games/dorfromantik/campaign';

  export let results: DorfromantikGame['results'];
  export let totalUnlocked = 0;
  export let currentGame = 1;
  export let boxAchievements: DorfromantikCampaign['boxAchievements'];
  export let campaignPathAchievements: DorfromantikCampaign['campaignPathAchievements'];
</script>

<div class="flex gap-3">
    <div class="flex-1 flex flex-col w-1/2 gap-1">
        <UnlockedResultsItem bind:value={results.unlocked.redHeart}
                             locked={boxAchievements.redHeart > currentGame}
                             on:input
        >
            Rote Herzen (1/passender Kante)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.circus}
                             locked={campaignPathAchievements.circus > currentGame}
                             on:input
        >
            Zirkus (umschlossen = 10)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.signalman}
                             locked={campaignPathAchievements.signalman > currentGame}
                             on:input
        >
            Bahnwärter (2/Bahnübergang)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.shephard}
                             locked={campaignPathAchievements.shephard > currentGame}
                             on:input
        >
            Schäferin (1/Schaf)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.hill}
                             locked={campaignPathAchievements.hill > currentGame}
                             on:input
        >
            Hügel (im Abstand 2 = 2/Aufrag)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.constructionArea}
                             locked={boxAchievements.constructionArea > currentGame}
                             on:input
        >
            Baustelle (pro Gebiet 7+ = 7)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.balloonLaunchSide}
                             locked={boxAchievements.balloonLaunchSide > currentGame}
                             on:input
        >
            Ballon-Startplatz (2/Entfernung)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.goldenHeart}
                             locked={boxAchievements.goldenHeart > currentGame}
                             on:input
        >
            Goldenes Herz
        </UnlockedResultsItem>
    </div>
    <div class="flex-1 flex flex-col w-1/2 gap-1">

        <UnlockedResultsItem bind:value={results.unlocked.forestHut}
                             locked={boxAchievements.forestHut > currentGame}
                             on:input
        >
            Waldhütte (Waldaufträge)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.harvestFestival}
                             locked={boxAchievements.harvestFestival > currentGame}
                             on:input
        >
            Erntefest (Feldaufräge)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.watchtower}
                             locked={boxAchievements.watchtower > currentGame}
                             on:input
        >
            Wachturm (Hausaufträge)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.locomotive}
                             locked={boxAchievements.locomotive > currentGame}
                             on:input
        >
            Lookomotive (Gleisaufträge)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.boat}
                             locked={boxAchievements.boat > currentGame}
                             on:input
        >
            Schiff (Flussaufträge)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.railroadStation}
                             locked={boxAchievements.railroadStation > currentGame}
                             on:input
        >
            Bahnhof (beendet = 1/Plättchen)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.harbor}
                             locked={boxAchievements.harbor > currentGame}
                             on:input
        >
            Hafen (beendet = 1/Plättchen)
        </UnlockedResultsItem>
    </div>
    <div class="w-12 flex flex-col justify-end items-center text-2xl">
        <div>{totalUnlocked}</div>
    </div>
</div>

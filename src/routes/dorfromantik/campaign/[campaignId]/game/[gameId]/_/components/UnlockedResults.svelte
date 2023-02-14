<script lang="ts">
  import type {DorfromantikGame} from '$lib/models/games/dorfromantik/game';
  import TopResultsColumn from './TopResultsColumn.svelte';
  import NumberInput from '$lib/components/controls/input/NumberInput.svelte';
  import UnlockedResultsItem from './UnlockedResultsItem.svelte';

  export let results: DorfromantikGame['results'];
  export let totalUnlocked = 0;
</script>

<div class="flex gap-2">
    <div class="flex-1 w-1/2">
        <UnlockedResultsItem bind:value={results.unlocked.redHeart}
                             on:input
        >
            Rote Herzen (1/passender Kante)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.circus}
                             on:input
        >
            Zirkus (umschlossen = 10)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.signalman}
                             on:input
        >
            Bahnwärter (2/Bahnübergang)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.shephard}
                             on:input
        >
            Schäferin (1/Schaf)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.hill}
                             on:input
        >
            Hügel (im Abstand 2 = 2/Aufrag)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.constructionArea}
                             on:input
        >
            Baustelle (pro Gebiet 7+ = 7)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.balloonLaunchSide}
                             on:input
        >
            Ballon-Startplatz (2/Entfernung)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.goldenHeart}
                             on:input
        >
            Goldenes Herz
        </UnlockedResultsItem>
    </div>
    <div class="flex-1 w-1/2">

        <UnlockedResultsItem bind:value={results.unlocked.forestHut}
                             on:input
        >
            Waldhütte (Waldaufträge)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.harvestFestival}
                             on:input
        >
            Erntefest (Feldaufräge)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.watchtower}
                             on:input
        >
            Wachturm (Hausaufträge)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.locomotive}
                             on:input
        >
            Lookomotive (Gleisaufträge)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.boat}
                             on:input
        >
            Schiff (Flussaufträge)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.railroadStation}
                             on:input
        >
            Bahnhof (beendet = 1/Plättchen)
        </UnlockedResultsItem>
        <UnlockedResultsItem bind:value={results.unlocked.harbor}
                             on:input
        >
            Hafen (beendet = 1/Plättchen)
        </UnlockedResultsItem>
    </div>
    <div class="w-12 flex flex-col justify-end items-center text-2xl">
        <div>{totalUnlocked}</div>
    </div>
</div>

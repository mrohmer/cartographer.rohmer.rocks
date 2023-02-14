<script lang="ts">
  import {liveQuery} from 'dexie';
  import {browser} from '$app/environment';
  import {dorfromantikDB} from '$lib/db/index.js';
  import {page} from '$app/stores';
  import {calcGameResults} from '$lib/utils/games/dorfromantik/calc-game-results';
  import {_} from 'svelte-i18n';

  const steps = {
    0: 1,
    100: 2,
    110: 3,
    120: 3,
    130: 4,
    140: 4,
    150: 5,
    160: 5,
    170: 6,
    180: 6,
    190: 7,
    200: 7,
    210: 8,
    220: 8,
    230: 9,
    240: 9,
    250: 10,
    260: 10,
    270: 11,
    280: 11,
    290: 12,
    300: 12,
    310: 13,
    320: 13,
    330: 14,
    340: 14,
    350: 15,
    375: 15,
    400: 15,
  };
  const stepsMinMax = Object.keys(steps)
    .sort()
    .map((points, index, arr) => [points, (arr[index + 1] ?? Number.MAX_SAFE_INTEGER) - 1]);

  $: groupedGames = browser
    ? liveQuery(async () => {
      const items = await dorfromantikDB.games.where({campaignId: +$page.params.campaignId}).toArray();
      const sorted = items
        .sort(({id: a}, {id: b}) => Math.sign(b - a));
      const points = sorted
        .map(game => calcGameResults(game.results)?.total);

      return points
        .map((p, index) => [index + 1, stepsMinMax.find(([min, max]) => p >= min && p <= max)?.[0]])
        .reduce(
          (prev, [game, group]) => ({
            ...prev,
            [group]: [
              ...(prev[group] ?? []),
              game,
            ]
          }),
          {},
        )
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
    {#each Object.entries(steps).reverse() as [points, checks]}
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

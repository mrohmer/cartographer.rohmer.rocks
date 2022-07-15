<script lang="ts">
  import type {GameRoundResult} from '$lib/models/game-round-result';
  import {createEventDispatcher} from 'svelte';
  import {sum} from '$lib/utils/sum';

  const dispatch = createEventDispatcher();

  export let result: GameRoundResult;
  export let points0Char: 'A' | 'B' | 'C' | 'D';
  export let points1Char: 'A' | 'B' | 'C' | 'D';
  export let future = false;

  export let otherRoundCoins = 0;

  let valuePoints0: number;
  let valuePoints1: number;
  let valueCoins: number;

  const handleChange = () => {
    valueCoins = Math.min(valueCoins ?? 0, 14 - otherRoundCoins);
    const mountainCoins = result?.coins?.mountain ?? 0;
    dispatch('change', {
      ...(typeof result === 'object' ? result : {}),

      coins: {
        ...(result?.coins ?? {}),
        normal: valueCoins > 0 ? valueCoins - mountainCoins : undefined,
      },
      points0: valuePoints0 ? valuePoints0 : undefined,
      points1: valuePoints1 ? valuePoints1 : undefined,
    })
  };

  const sanitizeNumber = (v: number | undefined) => v === undefined || isNaN(v) || typeof v !== 'number' ? undefined : v;
  const updateValues = ({points0, points1, coins}: GameRoundResult) => {
    valuePoints0 = sanitizeNumber(points0);
    valuePoints1 = sanitizeNumber(points1);
    valueCoins = !future ? sum(sanitizeNumber(coins?.normal), sanitizeNumber(coins?.mountain)) : undefined;
  };

  $: total = result ? sum(
    valueCoins ?? sum(result?.coins?.normal, result?.coins?.mountain),
    valuePoints0 ?? result.points0,
    valuePoints1 ?? result.points1,
    -(result.monsterPoints ?? 0)
  ) : undefined;
  $: {
    updateValues(result ?? {});
  }
  $: coins = sum(valueCoins ?? result?.coins?.normal, result?.coins?.mountain);
</script>

<div class="flex rounded border border-black overflow-hidden h-14 w-full" class:opacity-40={future}>
    <div class="w-1/3 h-full border-r border-black">
        <div class="w-full h-1/2 border-b border-black">
            <div class="absolute inset-0 flex flex-col justify-center text-center opacity-60 h-full text-orange-500">
                <div class:opacity-60={valuePoints0}>
                    {points0Char ?? ''}
                </div>
            </div>
            <input type="number" class="w-full h-full border-0 bg-transparent text-center" bind:value={valuePoints0}
                   min="0" max="99" disabled={future} on:input={handleChange}/>
        </div>
        <div class="w-full h-1/2 text-center">
            <input type="number" class="w-full h-full border-0 bg-transparent text-center" bind:value={valueCoins}
                   min={result?.coins?.mountain ?? 0} max={14 - otherRoundCoins} disabled={future} on:input={handleChange}/>
        </div>
    </div>
    <div class="w-1/3 h-full border-r border-black">
        <div class="w-full h-1/2 border-b border-black">
            <div class="absolute inset-0 flex flex-col justify-center text-center opacity-60 h-full text-orange-500">
                <div class:opacity-60={valuePoints1}>
                    {points1Char ?? ''}
                </div>
            </div>
            <input type="number" class="w-full h-full border-0 bg-transparent text-center" bind:value={valuePoints1}
                   min="0" max="99" disabled={future} on:input={handleChange}/>
        </div>
        <div class="w-full h-1/2 flex flex-col justify-center text-center cursor-not-allowed">
            {#if !future}
                {!!result?.monsterPoints && result?.monsterPoints > 0 ? `-${result?.monsterPoints}` : '0'}
            {/if}
        </div>
    </div>
    <div class="w-1/3 h-full flex flex-col justify-center text-center cursor-not-allowed">
        <div>
            {total ?? ''}
        </div>
    </div>
</div>

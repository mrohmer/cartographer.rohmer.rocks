<script lang="ts">
  import type {GameRoundResult} from '$lib/models/game-round-result';
  import {createEventDispatcher} from 'svelte';
  import {sum} from '$lib/utils/sum';

  const dispatch = createEventDispatcher();

  export let result: GameRoundResult;
  export let points0Char: 'A' | 'B' | 'C' | 'D';
  export let points1Char: 'A' | 'B' | 'C' | 'D';
  export let disabled = false;

  let valuePoints0: string;
  let valuePoints1: string;

  const handleChange = () => dispatch('change', {
    ...(typeof result === 'object' ? result : {}),
    points0: valuePoints0 ? parseInt(valuePoints0) : undefined,
    points1: valuePoints1 ? parseInt(valuePoints1) : undefined,
  });

  const handleInput = (event) => event.which < 48 || event.which > 57 && event.preventDefault();

  const updateValues = ({points0, points1}: GameRoundResult) => {
    valuePoints0 = points0 === undefined || isNaN(points0) || typeof points0 !== 'number' ? '' : points0.toFixed(0);
    valuePoints1 = points1 === undefined || isNaN(points1) || typeof points1 !== 'number' ? '' : points1.toFixed(0);
  };

  $: total = result ? sum(
    result?.coins?.normal,
    result?.coins?.mountain,
    valuePoints0 ? parseInt(valuePoints0) : result.points0,
    valuePoints1 ? parseInt(valuePoints1) : result.points1,
    -(result.monsterPoints ?? 0)
  ) : undefined;
  $: {
    updateValues(result ?? {});
  }
  $: coins = sum(result?.coins?.normal, result?.coins?.mountain);
</script>
<div class="flex rounded border border-black overflow-hidden h-14" class:opacity-40={disabled}>
    <div class="w-1/3 h-full border-r border-black">
        <div class="w-full h-1/2 border-b border-black">
            <div class="absolute inset-0 flex flex-col justify-center text-center opacity-60 h-full text-orange-500">
                <div class:opacity-60={valuePoints0}>
                    {points0Char ?? ''}
                </div>
            </div>
            <input type="text" class="w-full h-full border-0 bg-transparent text-center" bind:value={valuePoints0}
                   maxlength="2" {disabled} on:keydown={handleInput} on:input={handleChange}/>
        </div>
        <div class="w-full h-1/2 flex flex-col justify-center text-center cursor-not-allowed">
            <div>
                {coins}
            </div>
        </div>
    </div>
    <div class="w-1/3 h-full border-r border-black">
        <div class="w-full h-1/2 border-b border-black">
            <div class="absolute inset-0 flex flex-col justify-center text-center opacity-60 h-full text-orange-500">
                <div class:opacity-60={valuePoints1}>
                    {points1Char ?? ''}
                </div>
            </div>
            <input type="text" class="w-full h-full border-0 bg-transparent text-center" bind:value={valuePoints1}
                   maxlength="2" {disabled} on:keydown={handleInput} on:input={handleChange}/>
        </div>
        <div class="w-full h-1/2 flex flex-col justify-center text-center cursor-not-allowed">
            {!!result?.monsterPoints && result?.monsterPoints > 0 ? `-${result?.monsterPoints}` : '0'}
        </div>
    </div>
    <div class="w-1/3 h-full flex flex-col justify-center text-center cursor-not-allowed">
        <div>
            {total ?? ''}
        </div>
    </div>
</div>

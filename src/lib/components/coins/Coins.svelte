<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  export let coins: number[] = [];
  export let coin: boolean;
  export let mountainCoins: number;

  export let round = true;

  const dispatch = createEventDispatcher();

  $: persistentCoinCount = (coins?.reduce((prev, curr) => prev + curr, 0) ?? 0);
  $: nonSelectableCoins = persistentCoinCount + (mountainCoins ?? 0);
  $: totalCoinCount = nonSelectableCoins + (coin ? 1 : 0);
  $: border1 = coins?.[0];
  $: border2 = coins?.[1] !== undefined ? border1 + coins[1] : undefined;
  $: border3 = coins?.[2] !== undefined ? border2 + coins[2] : undefined;
  $: border4 = coins?.[3] !== undefined ? border3 + coins[3] : undefined;
  $: borders = [border1, border2, border3, border4].filter((_, i) => typeof round === 'number' && i < round);
  $: canSelectCoin = round === undefined || round <= 4;
</script>

<div class="flex">
    {#each Array(14) as _, i}
        {#each borders.filter(b => b === i) as _, b}
            <div class="w-0.5 h-5 bg-black" class:ml-px={b > 0}></div>
        {/each}
        <div class="w-5 h-5 mx-0.5 leading-5">
            <div class="border border-black rounded-full h-2 w-2 absolute bg-zinc-700 blur opacity-0 inset-0 mt-3 ml-2"
                 class:opacity-100={canSelectCoin && i === nonSelectableCoins && coin}
                 class:transition-opacity={canSelectCoin && i === nonSelectableCoins && coin}></div>
            <div class="border border-black rounded-full w-full h-full transition-transform"
                 class:cursor-pointer={canSelectCoin && i === nonSelectableCoins}
                 class:curor-not-allowed={!canSelectCoin || i !== nonSelectableCoins}
                 class:-translate-y-0.5={canSelectCoin && i === nonSelectableCoins && coin}
                 on:click={() => canSelectCoin && i === nonSelectableCoins && dispatch('toggle')}>
                <div class="bg-yellow-500 w-full h-full rounded-full text-xs text-center"
                     class:opacity-40={i + 1 > totalCoinCount}></div>
            </div>
        </div>
    {/each}
</div>



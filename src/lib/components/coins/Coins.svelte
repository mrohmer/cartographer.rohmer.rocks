<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  export let coins: Partial<Record<'standard'|'mountain', number>>[] = [];
  export let coin: boolean;

  export let round = true;

  const dispatch = createEventDispatcher();

  $: {
    console.log(coins, coinTypes);
  }
  $: coinsPerRound = coins?.map(({mountain, standard}) => (mountain ?? 0) + (standard ?? 0)) ?? []
  $: persistentCoinCount = coinsPerRound?.reduce((prev, curr) => prev + curr, 0) ?? 0;
  $: totalCoinCount = persistentCoinCount + (coin ? 1 : 0);
  $: border1 = coinsPerRound?.[0];
  $: border2 = coinsPerRound?.[1] !== undefined ? border1 + coinsPerRound[1] : undefined;
  $: border3 = coinsPerRound?.[2] !== undefined ? border2 + coinsPerRound[2] : undefined;
  $: border4 = coinsPerRound?.[3] !== undefined ? border3 + coinsPerRound[3] : undefined;
  $: borders = [border1, border2, border3, border4].filter((_, i) => typeof round === 'number' && i < round);
  $: canSelectCoin = round === undefined || round <= 4;
  $: coinTypes = coins?.map(({mountain, standard}) => [...(Array.from(Array(mountain ?? 0)).map(() => 'mountain')), ...(Array.from(Array(standard ?? 0)).map(() => 'standard'))]).flat();
</script>

<div class="flex">
    {#each Array(14) as _, i}
        {#each borders.filter(b => b === i) as _, b}
            <div class="w-0.5 h-5 bg-black" class:ml-px={b > 0}></div>
        {/each}
        <div class="w-5 h-5 mx-0.5 leading-5 select-none">
            <div class="border border-black rounded-full h-2 w-2 absolute bg-zinc-700 blur opacity-0 inset-0 mt-3 ml-2"
                 class:opacity-100={canSelectCoin && i === persistentCoinCount && coin}
                 class:transition-opacity={canSelectCoin && i === persistentCoinCount && coin}></div>
            <div class="border border-black rounded-full w-full h-full transition-transform"
                 class:cursor-pointer={canSelectCoin && i === persistentCoinCount}
                 class:curor-not-allowed={!canSelectCoin || i !== persistentCoinCount}
                 class:-translate-y-0.5={canSelectCoin && i === persistentCoinCount && coin}
                 on:click={() => canSelectCoin && i === persistentCoinCount && dispatch('toggle')}>
                <div class="bg-yellow-500 w-full h-full rounded-full text-xs text-center flex flex-col justify-center text-center"
                     title="{coinTypes?.[i] === 'mountain' ? 'This Coin was earned by a mountain.' : ''}"
                     class:opacity-40={i + 1 > totalCoinCount}>
                    <div>
                        {#if coinTypes?.[i] === 'mountain'}
                            M
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>



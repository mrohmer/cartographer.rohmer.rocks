<script lang="ts">
  import type {GameRoundResult} from '$lib/models/game-round-result';
  import RoundScore from "./RoundScore.svelte";
  import {createEventDispatcher} from 'svelte';
  import {debounceTime} from '$lib/utils/debounce-time';
  import {sumRoundResults} from "$lib/utils/sum.js";

  const dispatch = createEventDispatcher();

  const propagateChange = Array.from(Array(4)).map((_, round) =>
    debounceTime((roundResult: GameRoundResult) => dispatch('change', {round, roundResult}), 500)
  );

  const handleChange = (round: number, roundResult: GameRoundResult) => {
    if (!roundResults) {
      roundResults = [];
    }
    while (roundResults.length < round) {
      roundResults.push(undefined);
    }
    roundResults[round] = roundResult;
    propagateChange[round](roundResult);
  };

  const chars = ['A', 'B', 'C', 'D'];

  export let round: number;
  export let roundResults: GameRoundResult[];
</script>

<div class="flex my-4">
    {#each Array(4) as _, i}
        <RoundScore
                key={i}
                result={roundResults?.[i]}
                points0Char={chars[i]}
                points1Char={chars[(i + 1) % chars.length]}
                disabled={i === 0 ? !!round : round !== i}
                on:change={({detail}) => handleChange(i, detail)}
        />
        <div class="min-w-[20px] text-center flex flex-col justify-center">
            <div>
                {i < 3 ? '+' : '='}
            </div>
        </div>
    {/each}

    <div class="text-center flex flex-col justify-center text-2xl">
        <div>
            {#if roundResults?.length}
                {sumRoundResults(roundResults)}
            {:else}
                &nbsp;
            {/if}
        </div>
    </div>
</div>

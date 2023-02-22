<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    export let state: boolean[] = [false, false];
    export let direction: 'vertical'|'l-r'|'r-l'|'tl-br-flat'|'tr-bl-flat'|'tl-br'|'tr-bl' = 'vertical';
    export let heartPosition = undefined;

    export let isSelectableFromBeginning = false;
    export let isSelectableFromEnd = false;

    const dispatch = createEventDispatcher();

    const countConsecutiveTrueValues = (arr) => arr.reduce(
      (prev, curr, index) => prev + (prev === index && curr),
      0,
    )
    const handleClick = (index: number) => () => {
      if (!state[index]) {
        const validFromBeginning = isSelectableFromBeginning && (index === 0 || index <= countConsecutiveTrueValues(state));
        const validFromEnd = isSelectableFromEnd && (index === state.length - 1 || state.length - index -1 <= countConsecutiveTrueValues([...state].reverse()));

        if (!validFromBeginning && !validFromEnd) {
          return;
        }
      }
      state = state.map((v, i) => index === i ? !v : v);
      dispatch('select', index);
    }

    let klass: string;

    export {klass as class};
</script>

<div class="flex gap-1 justify-around {klass}"
     class:flex-col={direction === 'vertical'}
     class:flex-row-reverse={['r-l', 'tr-bl', 'tr-bl-flat'].includes(direction)}
     class:items-center={['vertical', 'r-l', 'l-r'].includes(direction)}
     class:rotate-[53deg]={direction === 'tl-br-flat'}
     class:rotate-[49deg]={direction === 'tl-br'}
     class:origin-top-left={direction.startsWith('tl-br')}
     class:-rotate-[53deg]={direction === 'tr-bl-flat'}
     class:-rotate-[49deg]={direction === 'tr-bl'}
     class:origin-top-right={direction.startsWith('tr-bl')}
     class:w-28={['tl-br-flat', 'tr-bl-flat'].includes(direction)}
     class:w-48={['tl-br', 'tr-bl'].includes(direction)}
     class:-ml-1={['tl-br'].includes(direction)}
     class:-ml-12={['tr-bl-flat'].includes(direction)}
     class:-ml-16={['tr-bl'].includes(direction)}
     class:mt-1={['tr-bl', 'tl-br'].includes(direction)}
     class:h-3={['tr-bl', 'tl-br', 'tl-br-flat', 'tr-bl-flat'].includes(direction)}
>
    {#each state as i, index}
        <div class="flex justify-around items-center h-3 w-3 border rounded-full"
             class:border-black={heartPosition !== index}
             class:border-red-600={heartPosition === index}
             on:click={handleClick(index)}
        >
            {#if i}
                <div>X</div>
            {/if}
            {#if heartPosition === index}
                <div class="absolute left-full whitespace-nowrap ml-2 -top-5 -bottom-5 my-auto h-fit">
                    + 🖤
                </div>
            {/if}
        </div>
    {/each}
</div>

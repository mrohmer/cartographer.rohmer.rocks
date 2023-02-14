<script lang="ts">
    import NumberInput from '$lib/components/controls/input/NumberInput.svelte';
    import {createEventDispatcher} from 'svelte';

    export let id: string = `achievement-${Math.floor(Math.random() * 10000000)}`;
    export let game: number;

    const dispatch = createEventDispatcher();
</script>

<div class="flex">
    <label for={id} class="flex-1 flex gap-x-1">
        <input type="checkbox" {id} checked={game !== undefined} on:change={(event) => dispatch('checked', event.target.checked)}/>
        <div class="flex-1"><slot /></div>
    </label>
    <div class="w-10">
        <NumberInput bind:value={game} on:input />
    </div>
</div>


<script lang="ts">
  import type {Game} from '$lib/models/games/beear-and-bread/game';
  import TextInput from './TextInput.svelte';
  import NumberInput from './NumberInput.svelte';
  import {createEventDispatcher} from 'svelte';
  import {add} from '../utils/add';

  const dispatch = createEventDispatcher();

  export let state: Game['state'];
  export let readonly = false;

  const handleChange = () => dispatch('change', state);
</script>

<table class="w-full table-fixed">
    <thead>
    <tr>
        <th></th>
        {#each state as player, index}
            <th>
                {#if !readonly}
                    <TextInput bind:value={player.name} id="player{index}Name" placeholder="Player {index + 1}" on:input={handleChange} />
                {:else}
                    {player.name ?? `Player ${index + 1}`}
                {/if}
            </th>
        {/each}
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Beer</td>
        {#each state as player, index}
            <td class="text-center">
                {#if !readonly}
                    <NumberInput bind:value={player.beer} id="player{index}Beer" placeholder="0" on:input={handleChange} />
                {:else}
                    {player.beer ?? 0}
                {/if}
            </td>
        {/each}
    </tr>
    <tr>
        <td>Beer Additions</td>
        {#each state as player, index}
            <td class="text-center">
                {#if !readonly}
                    <NumberInput bind:value={player.beerAddition} id="player{index}BeerAddition" placeholder="0" on:input={handleChange} />
                {:else}
                    {player.beerAddition ?? 0}
                {/if}
            </td>
        {/each}
    </tr>
    <tr>
        <td></td>
        {#each state as player}
            <td class="text-center">
                {add(player.beer, player.beerAddition)}
            </td>
        {/each}
    </tr>
    <tr>
        <td>Bread</td>
        {#each state as player, index}
            <td class="text-center">
                {#if !readonly}
                    <NumberInput bind:value={player.bread} id="player{index}Bread" placeholder="0" on:input={handleChange} />
                {:else}
                    {player.bread ?? 0}
                {/if}
            </td>
        {/each}
    </tr>
    <tr>
        <td>Bread Additions</td>
        {#each state as player, index}
            <td class="text-center">
                {#if !readonly}
                    <NumberInput bind:value={player.breadAddition} id="player{index}BreadAddition" placeholder="0" on:input={handleChange} />
                {:else}
                    {player.breadAddition ?? 0}
                {/if}
            </td>
        {/each}
    </tr>
    <tr>
        <td></td>
        {#each state as player}
            <td class="text-center">
                {add(player.bread, player.breadAddition)}
            </td>
        {/each}
    </tr>
    <tr>
        <td></td>
        {#each state as player}
            <td class="text-center">
                {add(player.beer, player.beerAddition, player.bread, player.breadAddition)}
            </td>
        {/each}
    </tr>
</table>


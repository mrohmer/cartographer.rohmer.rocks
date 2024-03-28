<script lang="ts">
  import type {Game} from '$lib/models/games/beear-and-bread/game';
  import TextInput from './TextInput.svelte';
  import NumberInput from './NumberInput.svelte';
  import {createEventDispatcher} from 'svelte';
  import {add} from '../utils/add';
  import BeerIcon from './icons/BeerIcon.svelte';
  import BreadIcon from './icons/BreadIcon.svelte';
  import CoinIcon from './icons/CoinIcon.svelte';

  const dispatch = createEventDispatcher();

  export let state: Game['state'];
  export let readonly = false;

  const handleChange = () => dispatch('change', state);
</script>

<table class="w-full table-fixed max-w-[300px] mx-auto text-xl text-center bg-black border-separate border-spacing-px my-4">
    <thead>
    <tr>
        <th class="bg-wood"></th>
        {#each state as player, index}
            <th class="bg-total">
                <TextInput bind:value={player.name} id="player{index}Name" placeholder="Player {index + 1}"
                           on:input={handleChange}/>
            </th>
        {/each}
    </tr>
    </thead>
    <tbody>
    <tr class="bg-beer">
        <td>
            <BeerIcon />
        </td>
        {#each state as player, index}
            <td>
                <NumberInput bind:value={player.beer} id="player{index}Beer" placeholder="0" on:input={handleChange}/>
            </td>
        {/each}
    </tr>
    <tr class="bg-beer">
        <td>
            <CoinIcon />
        </td>
        {#each state as player, index}
            <td>
                <NumberInput bind:value={player.beerAddition} id="player{index}BeerAddition" placeholder="0"
                             on:input={handleChange}/>
            </td>
        {/each}
    </tr>
    <tr class="h-2">
        <td class="bg-wood"></td>
        <td class="bg-wood"></td>
        <td class="bg-wood"></td>
    </tr>
    <tr>
        <td class="bg-wood"></td>
        {#each state as player}
            <td class="text-center p-1 bg-beer">
                {add(player.beer, player.beerAddition)}
            </td>
        {/each}
    </tr>
    <tr class="bg-bread">
        <td>
            <BreadIcon />
        </td>
        {#each state as player, index}
            <td>
                <NumberInput bind:value={player.bread} id="player{index}Bread" placeholder="0"
                             on:input={handleChange}/>
            </td>
        {/each}
    </tr>
    <tr class="bg-bread">
        <td>
            <CoinIcon />
        </td>
        {#each state as player, index}
            <td>
                <NumberInput bind:value={player.breadAddition} id="player{index}BreadAddition" placeholder="0"
                             on:input={handleChange}/>
            </td>
        {/each}
    </tr>
    <tr class="h-2">
        <td class="bg-wood"></td>
        <td class="bg-wood"></td>
        <td class="bg-wood"></td>
    </tr>
    <tr>
        <td class="bg-wood"></td>
        {#each state as player}
            <td class="text-center p-1 bg-bread">
                {add(player.bread, player.breadAddition)}
            </td>
        {/each}
    </tr>
    <tr class="h-2">
        <td class="bg-wood"></td>
        <td class="bg-wood"></td>
        <td class="bg-wood"></td>
    </tr>
    <tr>
        <td class="bg-wood"></td>
        {#each state as player}
            <td class="text-center p-1 bg-total">
                {Math.min(add(player.beer, player.beerAddition), add(player.bread, player.breadAddition))}
            </td>
        {/each}
    </tr>
</table>


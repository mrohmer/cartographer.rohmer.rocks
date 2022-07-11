<script context="module" lang="ts">
  export const prerender = true;
</script>
<script lang="ts">
  import {createGameMap} from '../lib/utils/create-game-map';
  import {onMount} from 'svelte';
  import Button from "../lib/components/Button.svelte";
  import Loading from "../lib/components/Loading.svelte";
  import {gameDB} from '../lib/db';
  import {goto} from '$app/navigation';
  import type {Observable} from 'dexie';
  import type {Game} from '../lib/models/game';
  import {liveQuery} from 'dexie';

  let mounted = false;
  let games: Observable<Game[]>;

  let loading = true;

  onMount(() => (mounted = true));

  const handleNewGameClick = async (type: 'normal' | 'wasteland') => {
    const map = createGameMap(type);

    const id = await gameDB.games.add({
      map,
    });
    await goto(`/${id}/scorecard`);
  }

  $: {
    if (mounted) {
      games = liveQuery(async () => {
        const result = await gameDB.games.toArray();
        loading = false;
        return result;
      });
    }
  }
</script>

{#if loading}
    <Loading/>
{:else}
    <h3>Start new Game</h3>
    <div class="flex">
        <Button class="block" on:click={() => handleNewGameClick('normal')}>Normal Map</Button>
        <Button class="block" on:click={() => handleNewGameClick('wasteland')}>Wasteland Map</Button>
    </div>

    {#if $games?.length}
        <div class="mb-2">
            {#each $games as game}
                <a class="block mr-2" href={`/${game.id}/scorecard`}>Game {game.id}</a>
            {/each}
        </div>
    {/if}
{/if}

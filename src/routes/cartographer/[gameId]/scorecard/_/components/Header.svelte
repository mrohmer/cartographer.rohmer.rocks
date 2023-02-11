<script lang="ts">
  import {faChevronLeft as homeIcon} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
  import {faEllipsisV as menuIcon} from '@fortawesome/free-solid-svg-icons/faEllipsisV';
  import {faTrash as trashIcon} from '@fortawesome/free-solid-svg-icons/faTrash';
  import Icon from "$lib/components/Icon.svelte";
  import {createEventDispatcher} from 'svelte';
  import {_} from "svelte-i18n";
  import DiagonalLineToggle from "./DiagonalLineToggle.svelte";
  import {gameDB} from '$lib/db';
  import {goto} from '$app/navigation';
  import {page} from '$app/stores';
  import {clickOutside} from '$lib/directives/outside-click';

  const dispatch = createEventDispatcher();

  export let round: number;
  export let nextButtonDisabled = false;
  export let showDiagonalHelperLines = false;

  let menuOpen = false;
  let height = 0;

  const handleDeleteGameClick = () => gameDB.games.delete(Number($page?.params?.gameId))
    .then(() => goto('/cartographer'));

  $: isFinished = round !== undefined && round > 3;
</script>
<div class="fixed left-0 top-0 right-0 w-full shadow bg-white z-50">
    <div class="flex max-w-[500px] mx-auto p-2 items-center"
         bind:clientHeight={height}>
        <a class="block text-left mr-2 px-4 py-1 text-black" href="/cartographer">
            <Icon icon={homeIcon}/>
        </a>
        <div class="flex-1 text-2xl font-light">
            <slot/>
        </div>
        {#if !isFinished}
            <div class="ml-2">
                <button class="px-4 py-1 transition-opacity"
                        class:animate-pulse={!nextButtonDisabled}
                        class:font-semibold={!nextButtonDisabled}
                        class:opacity-50={nextButtonDisabled}
                        disabled={nextButtonDisabled}
                        on:click={() => !nextButtonDisabled && dispatch('advance')}
                >
                    {round >= 3 ? $_('games.cartographer.pages.scorecard.btn.advance_finish') : $_('games.cartographer.pages.scorecard.btn.advance_season')}
                </button>
            </div>
        {/if}
        <div use:clickOutside on:outsideClick={() => menuOpen = false}>
            <div class="p-2 cursor-pointer" on:click={() => menuOpen = !menuOpen}>
                <Icon icon={menuIcon}/>
            </div>
            {#if menuOpen}
                <div class="absolute top-full right-0 w-[300px] max-w-[90vw] bg-white shadow">
                    <div class="px-3 py-2 border-b">
                        <DiagonalLineToggle bind:state={showDiagonalHelperLines}/>
                    </div>
                    <div class="px-3 py-2">
                        <button on:click={handleDeleteGameClick} class="w-full py-1 text-left flex items-baseline">
                            <div class="w-8 text-center mr-3">
                                <Icon icon={trashIcon}/>
                            </div>
                            <div class="flex-1">
                                {$_('games.cartographer.pages.scorecard.btn.delete_game')}
                            </div>
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
<div style="height: {height}px"></div>

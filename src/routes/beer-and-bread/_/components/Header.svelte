<script lang="ts">
  import {faChevronLeft as homeIcon} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
  import {faEllipsisV as menuIcon} from '@fortawesome/free-solid-svg-icons/faEllipsisV';
  import Icon from "$lib/components/Icon.svelte";
  import {createEventDispatcher} from 'svelte';
  import {_} from "svelte-i18n";
  import {clickOutside} from '$lib/directives/outside-click';

  const dispatch = createEventDispatcher();

  export let backHref: string;

  let menuOpen = false;
  let height = 0;

</script>
<div class="fixed left-0 top-0 right-0 w-full shadow bg-white z-50">
    <div class="flex max-w-[500px] mx-auto p-2 items-center"
         bind:clientHeight={height}>
        <a class="block text-left mr-2 px-4 py-1 text-black" href={backHref}>
            <Icon icon={homeIcon}/>
        </a>
        <div class="flex-1 text-2xl font-light">
            <slot/>
        </div>


        {#if $$slots.action}
            <slot name="action"/>
        {/if}
        {#if $$slots.menu}
            <div use:clickOutside on:outsideClick={() => menuOpen = false}>
                <div class="p-2 cursor-pointer" on:click={() => menuOpen = !menuOpen}>
                    <Icon icon={menuIcon}/>
                </div>
                {#if menuOpen}
                    <div class="absolute top-full right-0 w-[300px] max-w-[90vw] bg-white shadow">
                        <slot name="menu"/>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</div>
<div style="height: {height}px"></div>

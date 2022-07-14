<script lang="ts">
    import {faChevronDown as icon} from '@fortawesome/free-solid-svg-icons/faChevronDown';
    import Icon from "./Icon.svelte";
    import {slide} from 'svelte/transition';

    export let open = false;
</script>

<div class="">
    <div class="flex items-center py-2 cursor-pointer" on:click={() => open = !open}>
        <div class="flex-1 pt-1">
            <slot name="title" />
        </div>
        <div class="transition-transform origin-center" class:rotate-180={open}>
            <Icon {icon} />
        </div>
    </div>
    {#if open}
        <div transition:slide|local>
            <slot />
        </div>
    {/if}
</div>

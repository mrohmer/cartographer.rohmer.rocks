<script lang="ts">
    import {createGameMap} from '$lib/utils/create-game-map';
    import MiniMap from "./MiniMap.svelte";

    export let type: 'normal' | 'wasteland';

    let width = 0;

    $: map = createGameMap(type);
</script>

<button class="block w-full" on:click>
    <div class="text-center mb-2">
        <slot />
    </div>
    <div class="w-full" bind:clientWidth={width} style="height: {width}px">
        <MiniMap map={map} />
    </div>
</button>

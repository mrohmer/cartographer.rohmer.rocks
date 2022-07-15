<script lang="ts">
  import GameField from "$lib/components/GameField.svelte";
  import type {GameMap} from '$lib/models/game-map';
  import {createGameMap} from "$lib/utils/create-game-map";

  export let map: GameMap;
</script>

<div class="w-full h-full">
    <div class="w-[1000%] h-[1000%] origin-top-left" style="transform: scale(0.1)">
        <GameField map={map ?? createGameMap('normal')} showIcons={false} />
    </div>
    <div class="absolute inset-0 w-full h-full"></div>
</div>

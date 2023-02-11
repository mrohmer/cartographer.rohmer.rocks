<script lang="ts">
  import {createGameMap} from '$lib/utils/create-game-map';
  import GameField from "../../_/components/GameField.svelte";
  import {_} from "svelte-i18n";

  const map = createGameMap('error');

  export let status: 404 | 500 = 404;
</script>

<div class="max-w-[500px] mx-auto my-4">
    <div class="max-w-[400px] mx-auto">
        <GameField {map}/>
        <div class="absolute inset-0 w-full h-full"></div>
    </div>

    <div class="text-center mt-5">
        <h1 class="text-2xl font-light ">
            {$_(`games.cartographer.pages.error.${status === 404 ? 404 : 500}.headline`, {default: ''})}
        </h1>
        <p class="font-extralight mt-1 text-xs">
            {$_(`games.cartographer.pages.error.${status === 404 ? 404 : 500}.text`, {default: ''})}
        </p>
        <p class="font-extralight mt-5">
            <a href="/">{$_(`games.cartographer.pages.error.${status === 404 ? 404 : 500}.back_link`, {default: ''})}</a>
        </p>
    </div>
</div>

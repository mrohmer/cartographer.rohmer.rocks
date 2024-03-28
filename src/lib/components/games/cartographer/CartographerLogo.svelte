<script lang="ts">
  import {_} from "svelte-i18n";
</script>

<div class="text-center font-cinzel uppercase">
    <div class="inline-block">
        <div class="text-yellow-600">
            <div class="text-xl text-left pl-[2.7rem] sm:pl-[5.4rem] -mb-[0.4rem]"
                 style="text-shadow: 1px  1px 1px black, 1px -1px 1px black, -1px  1px 1px black, -1px -1px 1px black;">{$_('games.cartographer.game.article', {default: ''})}</div>
            <div class="text-3xl sm:text-6xl"
                 style="text-shadow: 1px  1px 2px black, 1px -1px 2px black, -1px  1px 2px black, -1px -1px 2px black;">{$_('games.cartographer.game.name', {default: ''})}</div>
        </div>
        <div class="flex items-center sm:-mt-[0.4rem]">
            <div class="flex-1 h-px bg-black"></div>
            <div class="mx-2 text-xs sm:text-normal">{$_('games.cartographer.game.scorecard', {default: ''})}</div>
            <div class="flex-1 h-px bg-black"></div>
        </div>
    </div>
</div>

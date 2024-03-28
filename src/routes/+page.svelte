<script>
  import CartographerLogo from "$lib/components/games/cartographer/CartographerLogo.svelte";
  import GameLink from "$lib/components/GameLink.svelte";
  import {_} from "svelte-i18n";
</script>

<div class="max-w-[500px] mx-auto pt-10 px-5 min-h-[80vh]">
    <div class="mb-5">
        <h1 class="text-center text-3xl">{$_('pages.index.title')}</h1>
        <h2 class="text-center text-xl">{$_('pages.index.subtitle')}</h2>
    </div>

    <h3 class="text-center text-2xl mb-3">Spiele</h3>
    <div class="flex flex-col gap-3">
        <GameLink href="/cartographer">
            <CartographerLogo/>
        </GameLink>
        <GameLink href="/beer-and-bread" class="bg-wood text-center text-white">
            <div class="text-3xl" style="text-shadow: 1px  1px 1px black, 1px -1px 1px black, -1px  1px 1px black, -1px -1px 1px black;">Beer and Bread</div>
        </GameLink>
    </div>
</div>

<script lang="ts">
  import {_} from "svelte-i18n";
</script>

<svelte:head>
    <title>{$_('games.cartographer.meta.title', {default: 'Kartograph Scorekarte'})}</title>
    <meta name="description" content="{$_('games.cartographer.meta.description', {default: ''})}">
</svelte:head>

<slot/>

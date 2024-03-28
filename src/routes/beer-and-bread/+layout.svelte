<script lang="ts">
  import {_} from "svelte-i18n";

</script>

<svelte:head>
    <title>{$_('games.beerAndBread.meta.title', {default: 'Beer and Bread Scorekarte'})}</title>
    <meta name="description" content="{$_('games.beerAndBread.meta.description', {default: ''})}">
</svelte:head>

<slot/>

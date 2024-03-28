<script lang="ts">
  import {_} from "svelte-i18n";

</script>

<svelte:head>
    <title>{$_('games.beer_and_bread.meta.title', {default: 'Beer and Bread Scorekarte'})}</title>
    <meta name="description" content="{$_('games.beer_and_bread.meta.description', {default: ''})}">
</svelte:head>

<slot/>

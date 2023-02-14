<script lang="ts">
  import {_} from "svelte-i18n";
</script>

<svelte:head>
    <title>{$_('games.dorfromantik.meta.title', {default: 'Dorfromantik Scorekarte'})}</title>
    <meta name="description" content="{$_('games.dorfromantik.meta.description', {default: ''})}">
</svelte:head>

<slot/>

<script lang="ts">
  import '../app.css';
  import {_, locale} from "svelte-i18n";
  import PoweredBy from '$lib/components/PoweredBy.svelte';
  import ExpansionPanel from "$lib/components/ExpansionPanel.svelte";
</script>

<svelte:head>
    <title>{$_('meta.title', {default: 'Tabletop Game World by Matthias Rohmer'})}</title>
    <meta name="description" content="{$_('meta.description', {default: ''})}">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="theme-color" content="#000000"/>
    {#if $locale}
        <meta http-equiv="content-language" content={$locale}/>
    {/if}
</svelte:head>

<slot/>

<div class="mt-20 mb-5 px-2">
    <div class="text-center font-extralight text-xs mb-3">
        {@html $_('footer.rights_disclaimer')}
    </div>
    <div>
        <PoweredBy name="Matthias Rohmer"
                   url="https://matthias.rohmer.rocks"
                   technologies={['svelte', 'netlify']}
                   sourceCodeUrl="https://github.com/mrohmer/cartographer.rohmer.rocks"/>
    </div>
    <div class="mt-3 text-xs font-extralight max-w-[300px] mx-auto">
        <ExpansionPanel>
            <svelte:fragment slot="title">{$_('footer.images_used')}</svelte:fragment>
            <a href="https://thenounproject.com/icon/ancient-ruins-2087414/" rel="noreferrer noopener" class="block">
                Ancient Ruins by Maxicons from NounProject.com
            </a>
            <a href="https://thenounproject.com/icon/beer-1101795/" rel="noreferrer noopener" class="block">
                Beer by Valeriy from NounProject.com
            </a>
            <a href="https://thenounproject.com/icon/bread-1003376/" rel="noreferrer noopener" class="block">
                Bread by Danil Polshin from NounProject.com
            </a>
            <a href="https://thenounproject.com/icon/coin-1078692/" rel="noreferrer noopener" class="block">
                Coin by Orin zuu from NounProject.com
            </a>
        </ExpansionPanel>
    </div>
</div>

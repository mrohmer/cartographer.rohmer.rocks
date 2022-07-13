<script lang="ts" context="module">
  import { waitLocale } from 'svelte-i18n'
  import {init} from '$lib/i18n';

  export async function load() {
    init();
    await waitLocale();

    return {};
  }
</script>
<script lang="ts">
    import '../app.css';
    import {_} from "svelte-i18n";
    import PoweredBy from '$lib/components/PoweredBy.svelte';
</script>

<svelte:head>
    <title>{$_('meta.title', {default: 'Kartograph Scorekarte'})}</title>
    <meta name="description" content="{$_('meta.description', {default: ''})}">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="theme-color" content="#000000" />
</svelte:head>

<slot />

<div class="mt-20 mb-5">
    <div class="text-center font-extralight text-xs mb-3">
        {@html $_('footer.rights_disclaimer')}
    </div>
    <div>
        <PoweredBy name="Matthias Rohmer"
                   url="https://matthias.rohmer.rocks"
                   technologies={['svelte', 'netlify']}
                   sourceCodeUrl="https://github.com/mrohmer/cartographer.rohmer.rocks" />
    </div>
</div>

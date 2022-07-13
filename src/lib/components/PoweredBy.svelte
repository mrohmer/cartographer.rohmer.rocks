<script lang='ts'>
  export let technologies: string[] = ['svelte'];
  export let name: string;
  export let url: string;
  export let sourceCodeUrl: string;
  export let sourceCodePlatform = 'Github';

  $: technologiesStr = [[...technologies].splice(0, technologies.length - 1).join(', '), technologies[technologies.length - 1]].filter(i => !!i).join(' & ');
</script>

<div class='text-xs text-center py-4 font-extralight'>
    Made with <span class="text-red-700">♥️</span>
    {#if technologies.length > 1}
        , {[...technologies].splice(0, technologies.length - 1).join(', ')}
    {/if}
    {#if technologies.length > 0}
        & {technologies[technologies.length - 1]}
    {/if}
    {#if name && url}
        by <a href={url} class="hover:underline">{name}</a>.
    {:else if name }
        by {name}.
    {/if}
    {#if sourceCodeUrl}
        <br>
        View the source code on <a href={sourceCodeUrl} class="hover:underline">{sourceCodePlatform}</a>.
    {/if}
</div>

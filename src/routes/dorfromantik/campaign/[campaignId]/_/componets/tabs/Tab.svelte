<script lang="ts">
    import {getContext} from 'svelte';

    export let active = false;
    export let href: string;

    const size = getContext('size');
</script>

<a {href}
   class="block pt-2.5 px-1 transition-colors hover:border-b-dorfromantik-blue"
   class:text-dorfromantik-blue={active}
   class:border-b-dorfromantik-blue={active}
   class:border-b-transparent={!active}

   class:text-xl={$size === 'lg'}
   class:border-b-2={$size === 'lg'}

   class:border-b={$size === 'sm'}
>
    <slot />
</a>

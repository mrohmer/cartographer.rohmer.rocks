<script lang="ts">

    import {writable} from 'svelte/store';
    import {setContext} from 'svelte';

    const sizeStore = writable<'lg'|'sm'>('lg');
    setContext('size', sizeStore);

    export let size: 'lg'|'sm' = 'lg';

    $: sizeStore.set(size);
</script>

<div class="flex gap-1">
    <slot />
</div>

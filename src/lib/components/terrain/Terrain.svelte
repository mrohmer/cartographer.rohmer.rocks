<script lang="ts">
    import type {Terrain} from '../../models/terrain';

    export let terrain: Terrain = undefined;
    export let isRuin: boolean = false;
</script>

<style lang="postcss">
    .terrain--wasteland {
        @apply bg-wasteland;
    }
    .terrain--ruin {
        @apply bg-gray-200;
    }
    .terrain--mountain {
        @apply bg-mountain text-white;
    }
    .terrain--forest {
        @apply bg-forest text-white;
    }
    .terrain--village {
        @apply bg-village text-white;
    }
    .terrain--farm {
        @apply bg-farm text-white;
    }
    .terrain--water {
        @apply bg-water text-white;
    }
    .terrain--monster {
        @apply bg-monster text-white;
    }
</style>

<div class="h-full w-full flex flex-col justify-center"
     class:terrain--ruin={isRuin}
     class:terrain--wasteland={terrain === 'wasteland'}
     class:terrain--mountain={terrain === 'mountain'}
     class:terrain--forest={terrain === 'forest'}
     class:terrain--village={terrain === 'village'}
     class:terrain--farm={terrain === 'farm'}
     class:terrain--water={terrain === 'water'}
     class:terrain--monster={terrain === 'monster'}>
    <div>
        {terrain !== 'wasteland' ? terrain?.substring(0, 3) ?? '' : ''}
    </div>
</div>

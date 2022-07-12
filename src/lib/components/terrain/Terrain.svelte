<script lang="ts">
    import type {Terrain} from '../../models/terrain';
    import { _ } from 'svelte-i18n';
    import Icon from "../Icon.svelte";
    import {faTree as forestIcon} from '@fortawesome/free-solid-svg-icons/faTree';
    import {faHome as villageIcon} from '@fortawesome/free-solid-svg-icons/faHome';
    import {faSkull as monsterIcon} from '@fortawesome/free-solid-svg-icons/faSkull';
    import {faWater as waterIcon} from '@fortawesome/free-solid-svg-icons/faWater';
    import {faMountain as mountainIcon} from '@fortawesome/free-solid-svg-icons/faMountain';
    import {faWheatAlt as farmIcon} from '@fortawesome/free-solid-svg-icons/faWheatAlt';

    const ICON_MAP: Partial<Record<Terrain, any>> = {
      forest: forestIcon,
      village: villageIcon,
      monster: monsterIcon,
      water: waterIcon,
      mountain: mountainIcon,
      farm: farmIcon,
    }

    export let terrain: Terrain = undefined;
    export let isRuin: boolean = false;
    export let showDiagonalHelperLine = false;
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
    <div title={$_(`terrains.${terrain}`)}>
        {#if terrain in ICON_MAP}
            <Icon icon={ICON_MAP[terrain]} class="fill-white" />
        {:else if terrain && terrain !== 'wasteland'}
            {$_(`terrains.${terrain}`)?.substring(0, 3).toLocaleLowerCase()}
        {/if}
    </div>
    <div class="absolute inset-0 w-[146%] h-[3px] border-y-[1px] border-zinc-200 bg-zinc-300 rotate-45 origin-center transition-opacity my-auto -mx-[22%]" class:opacity-0={!showDiagonalHelperLine}></div>
</div>

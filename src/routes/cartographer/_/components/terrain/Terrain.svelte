<script lang="ts">
  import type {TerrainAndEraser} from '$lib/models/games/cartographer/terrain';
  import {_} from 'svelte-i18n';
  import Icon from "$lib/components/Icon.svelte";
  import {faTree as forestIcon} from '@fortawesome/free-solid-svg-icons/faTree';
  import {faHome as villageIcon} from '@fortawesome/free-solid-svg-icons/faHome';
  import {faSkull as monsterIcon} from '@fortawesome/free-solid-svg-icons/faSkull';
  import {faWater as waterIcon} from '@fortawesome/free-solid-svg-icons/faWater';
  import {faMountain as mountainIcon} from '@fortawesome/free-solid-svg-icons/faMountain';
  import {faWheatAlt as farmIcon} from '@fortawesome/free-solid-svg-icons/faWheatAlt';
  import {faEraser as eraserIcon} from '@fortawesome/free-solid-svg-icons/faEraser';
  import RuinIcon from "./RuinIcon.svelte";
  import type {IconDefinition} from '@fortawesome/free-solid-svg-icons';

  const ICON_MAP: Partial<Record<TerrainAndEraser, IconDefinition>> = {
    forest: forestIcon,
    village: villageIcon,
    monster: monsterIcon,
    water: waterIcon,
    mountain: mountainIcon,
    farm: farmIcon,
    eraser: eraserIcon,
  }

  export let terrain: TerrainAndEraser = undefined;
  export let isRuin: boolean = false;
  export let showDiagonalHelperLine = false;
  export let showIcon = true;
</script>

<style lang="postcss">
    .terrain--wasteland {
        @apply bg-wasteland;
    }

    .terrain--ruin {
        @apply bg-gray-200;
    }

    .terrain--mountain {
        @apply bg-mountain text-white fill-white;
    }

    .terrain--forest {
        @apply bg-forest text-white fill-white;
    }

    .terrain--village {
        @apply bg-village text-white fill-white;
    }

    .terrain--farm {
        @apply bg-farm text-white fill-white;
    }

    .terrain--water {
        @apply bg-water text-white fill-white;
    }

    .terrain--monster {
        @apply bg-monster text-white fill-white;
    }
    .terrain--eraser {
        @apply bg-white text-black fill-black;
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
     class:terrain--monster={terrain === 'monster'}
     class:terrain--eraser={terrain === 'eraser'}
>
    {#if showIcon}
        {#if isRuin}
            <div class="absolute inset-0 w-3/5 h-3/5 m-auto origin-center transition-transform "
                 class:scale-110={!terrain}
                 class:fill-neutral-400={!terrain}
                 class:fill-neutral-300={terrain}
                 class:origin-top-right={terrain}
                 class:scale-50={terrain}
                 class:translate-x-1.5={terrain}
                 class:-translate-y-1.5={terrain}
            >
                <RuinIcon />
            </div>
        {/if}
        <div title={$_(`games.cartographer.terrains.${terrain}`, {default: ''})}>
            {#if terrain in ICON_MAP}
                <Icon icon={ICON_MAP[terrain]}/>
            {:else if terrain && terrain !== 'wasteland'}
                {$_(`games.cartographer.terrains.${terrain}`)?.substring(0, 3).toLocaleLowerCase()}
            {/if}
        </div>
    {/if}
    <div class="absolute inset-0 w-[146%] h-[3px] border-y-[1px] border-zinc-200 bg-zinc-300 rotate-45 origin-center transition-opacity my-auto -mx-[22%]"
         class:opacity-0={!showDiagonalHelperLine}></div>
</div>

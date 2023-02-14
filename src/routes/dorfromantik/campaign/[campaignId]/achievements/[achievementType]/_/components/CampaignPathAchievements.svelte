<script lang="ts">
  import Achievement from './Achievement.svelte';
  import type {DorfromantikCampaign} from '$lib/models/games/dorfromantik/campaign';
  import {DorfromantikCampaignPathAchievement} from '$lib/models/games/dorfromantik/achievement';
  import {createEventDispatcher} from 'svelte';

  export let state: DorfromantikCampaign['campaignPathAchievements'];

  export let currentGame: number = 1;

  const dispatch = createEventDispatcher();

  const onInput = () => dispatch('change');
  const onCheckedChange = (key: DorfromantikCampaignPathAchievement) => ({detail: checked}) => {
    if (!state) {
      state = {};
    }
    if (!!state[key] === checked) {
      return;
    }

    state = {
      ...state,
      [key]: checked ? currentGame : undefined,
    };

    dispatch('change');
  }
</script>

<Achievement bind:game={state.signalman} on:checked={onCheckedChange(DorfromantikCampaignPathAchievement.SIGNALMAN)}
             on:input={onInput}>
    Bahnwärter
</Achievement>
<Achievement bind:game={state.farmYard} on:checked={onCheckedChange(DorfromantikCampaignPathAchievement.FARM_YARD)}
             on:input={onInput}>
    Bauernhof
</Achievement>
<Achievement bind:game={state.castle} on:checked={onCheckedChange(DorfromantikCampaignPathAchievement.CASTLE)}
             on:input={onInput}>
    Burg
</Achievement>
<Achievement bind:game={state.fallowDeer} on:checked={onCheckedChange(DorfromantikCampaignPathAchievement.FALLOW_DEER)}
             on:input={onInput}>
    Damhirsch
</Achievement>
<Achievement bind:game={state.villageTunnel}
             on:checked={onCheckedChange(DorfromantikCampaignPathAchievement.VILLAGE_TUNNEL)}
             on:input={onInput}>
    Dorftunnel
</Achievement>
<Achievement bind:game={state.grainTunnel} on:checked={onCheckedChange(DorfromantikCampaignPathAchievement.GRAIN_TUNNEL)}
             on:input={onInput}>
    Getreidetunnel
</Achievement>
<Achievement bind:game={state.hill} on:checked={onCheckedChange(DorfromantikCampaignPathAchievement.HILL)}
             on:input={onInput}>
    Hügel
</Achievement>
<Achievement bind:game={state.warehouse} on:checked={onCheckedChange(DorfromantikCampaignPathAchievement.WAREHOUSE)}
             on:input={onInput}>
    Lagerhaus
</Achievement>
<Achievement bind:game={state.shephard} on:checked={onCheckedChange(DorfromantikCampaignPathAchievement.SHEPHARD)}
             on:input={onInput}>
    Schäferin
</Achievement>
<Achievement bind:game={state.forestTunnel} on:checked={onCheckedChange(DorfromantikCampaignPathAchievement.FOREST_TUNNEL)}
             on:input={onInput}>
    Waldtunnel
</Achievement>
<Achievement bind:game={state.cloud} on:checked={onCheckedChange(DorfromantikCampaignPathAchievement.CLOUD)}
             on:input={onInput}>
    Wolke
</Achievement>
<Achievement bind:game={state.circus} on:checked={onCheckedChange(DorfromantikCampaignPathAchievement.CIRCUS)}
             on:input={onInput}>
    Zirkus
</Achievement>

<script lang="ts">
  import Achievement from './Achievement.svelte';
  import {createEventDispatcher} from 'svelte';
  import {DorfromantikBoxAchievement} from '$lib/models/games/dorfromantik/achievement';
  import type {DorfromantikCampaign} from '$lib/models/games/dorfromantik/campaign';

  export let state: DorfromantikCampaign['boxAchievements'];

  export let currentGame: number = 1;

  const dispatch = createEventDispatcher();

  const onInput = () => dispatch('change');
  const onCheckedChange = (key: DorfromantikBoxAchievement) => ({detail: checked}) => {
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

<Achievement bind:game={state.onTheRoadToSuccess}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.ON_THE_ROAD_TO_SUCCESS)}
             on:input={onInput}>
    Auf Erfolgsspur
</Achievement>
<Achievement bind:game={state.railroadStation}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.RAILROAD_STATION)}
             on:input={onInput}>
    Bahnhof
</Achievement>
<Achievement bind:game={state.balloonLaunchSide}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.BALLOON_LAUNCH_SIDE)}
             on:input={onInput}>
    Ballon-Startplatz
</Achievement>
<Achievement bind:game={state.constructionArea}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.CONSTRUCTION_AREA)}
             on:input={onInput}>
    Baustelle
</Achievement>
<Achievement bind:game={state.harvestFestival}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.HARVEST_FESTIVAL)}
             on:input={onInput}>
    Erntefest
</Achievement>
<Achievement bind:game={state.flagFestival}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.FLAG_FESTIVAL)}
             on:input={onInput}>
    Fahnenfest
</Achievement>
<Achievement bind:game={state.goldenHeart}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.GOLDEN_HEART)}
             on:input={onInput}>
    Goldenes Herz
</Achievement>
<Achievement bind:game={state.harbor}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.HARBOR)}
             on:input={onInput}>
    Hafen
</Achievement>
<Achievement bind:game={state.heartsDesires}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.HEARTS_DESIRES)}
             on:input={onInput}>
    Herzenswünsche
</Achievement>
<Achievement bind:game={state.locomotive}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.LOCOMOTIVE)}
             on:input={onInput}>
    Lokomotive
</Achievement>
<Achievement bind:game={state.redHeart}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.RED_HEART)}
             on:input={onInput}>
    Rote Herzen
</Achievement>
<Achievement bind:game={state.boat}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.BOAT)}
             on:input={onInput}>
    Schiff
</Achievement>
<Achievement bind:game={state.watchtower}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.WATCH_TOWER)}
             on:input={onInput}>
    Wachturm
</Achievement>
<Achievement bind:game={state.forestHut}
             on:checked={onCheckedChange(DorfromantikBoxAchievement.FOREST_HUT)}
             on:input={onInput}>
    Waldhütte
</Achievement>

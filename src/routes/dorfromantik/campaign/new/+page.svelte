<script lang="ts">
  import type {DorfromantikCampaign} from '$lib/models/games/dorfromantik/campaign';
  import TextInput from '$lib/components/controls/input/TextInput.svelte';
  import {_} from 'svelte-i18n';
  import {dorfromantikDB} from '../../../../lib/db';
  import {goto} from '$app/navigation';

  let campaign: Pick<DorfromantikCampaign, 'name' | 'players'> = {
    name: '',
    players: [''],
  };

  const handleAddPlayerClick = () => {
    if (lastPlayerEmpty) {
      return;
    }

    campaign.players = [
      ...campaign.players,
      '',
    ]
  };
  const handleSubmit = async () => {
    const clone = JSON.parse(JSON.stringify(campaign));
    clone.players = clone.players.filter(i => i?.trim().length);

    if (!clone.players.length) {
      return;
    }

    const id = await dorfromantikDB.campaigns.add(clone);

    console.log(id);

    await goto(`/dorfromantik/campaign/${id}`);
  };

  $: lastPlayerEmpty = !campaign.players[campaign.players.length - 1].trim().length;
</script>

<h1>{$_('games.dorfromantik.pages.new.headline')}</h1>

<form on:submit={handleSubmit}>
    <div>
        <TextInput id="name" bind:value={campaign.name}>
            {$_('games.dorfromantik.pages.new.fields.name.label')}
        </TextInput>
    </div>
    {#each campaign.players as player, index}
        <div>
            <TextInput id="player-{index}" bind:value={player}>
                {$_('games.dorfromantik.pages.new.fields.players.label')} {index + 1}{!index ? '*' : ''}
            </TextInput>
        </div>
    {/each}
    <div>
        <button type="button"
                disabled={lastPlayerEmpty}
                on:click={handleAddPlayerClick}
        >{$_('games.dorfromantik.pages.new.fields.players.add')}</button>
    </div>

    <div>
        <button type="submit">
            {$_('games.dorfromantik.pages.new.submit')}
        </button>
    </div>
</form>

{JSON.stringify(campaign)}

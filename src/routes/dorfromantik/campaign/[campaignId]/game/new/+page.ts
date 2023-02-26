import type {Load} from '@sveltejs/kit';
import {redirect} from '@sveltejs/kit';
import {browser} from '$app/environment';
import {dorfromantikDB} from '$lib/db';

export const prerender = true;
export let load: Load = async ({params, parent}) => {
  if (browser) {
    const {campaign} = await parent();
    const campaignId = +params.campaignId!;
    const id = await dorfromantikDB.games.add({
      campaignId,
      number: (await dorfromantikDB.games.where({campaignId}).count()),
      players: campaign.players ?? []
    } as any);

    throw redirect(300, `/dorfromantik/campaign/${campaignId}/game/${id}`);
  }
}

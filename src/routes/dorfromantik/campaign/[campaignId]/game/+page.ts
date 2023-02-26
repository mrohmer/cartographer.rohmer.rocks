import {redirect} from '@sveltejs/kit';
import type {Load} from '@sveltejs/kit';
import {browser} from '$app/environment';
import {dorfromantikDB} from '$lib/db';

export const prerender = true;

const getLastGameId = async (campaignId: number) => {
  if (!browser) {
    return undefined;
  }

  const games = await dorfromantikDB.games.where({campaignId}).toArray();

  return games
    .sort(({id: a}, {id: b}) => Math.sign(b! - a!))[0]?.id
}
export let load: Load = async ({params}) => {
  if (browser) {
    const id = (await getLastGameId(+params.campaignId!)) ?? 'new';
    console.log(`/dorfromantik/campaign/${params.campaignId}/game/${id}`);

    throw redirect(300, `/dorfromantik/campaign/${params.campaignId}/game/${id}`);
  }
}

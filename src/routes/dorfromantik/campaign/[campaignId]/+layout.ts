import {browser} from '$app/environment';
import type {Load} from '@sveltejs/kit';
import {error} from '@sveltejs/kit';
import {dorfromantikDB} from '$lib/db';

export const load: Load = async ({params}) => {
  if (!browser || params.campaignId === '0') {
    return {
      campaign: undefined,
    };
  }

  if (!params.campaignId ||!/^\d+$/.test(params.campaignId)) {
    throw error(400);
  }

  const campaign = await dorfromantikDB.campaigns.get(+params.campaignId);

  if (!campaign) {
    throw error(404);
  }

  return {
    campaign,
  };
}

import {browser} from '$app/environment';
import type {Load} from '@sveltejs/kit';
import {error} from '@sveltejs/kit';
import {dorfromantikDB} from '$lib/db';

export const load: Load = async ({params}) => {
  if (!browser || params.gameId === '0') {
    return {
      game: undefined,
    };
  }

  if (!params.gameId ||!/^\d+$/.test(params.gameId)) {
    throw error(400);
  }

  const game = await dorfromantikDB.games.get(+params.gameId);

  if (!game) {
    throw error(404);
  }

  return {
    game,
  };
}

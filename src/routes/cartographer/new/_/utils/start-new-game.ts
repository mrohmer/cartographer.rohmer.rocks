import {createGameMap} from '$lib/utils/create-game-map';
import {cartographerDB} from '$lib/db';
import {goto} from '$app/navigation';

export const startNewGame = async (type: 'normal' | 'wasteland') => {
  const map = createGameMap(type);

  const id = await cartographerDB.games.add({
    map,
    type,
  } as any);
  await goto(`/cartographer/${id}/scorecard`);
}

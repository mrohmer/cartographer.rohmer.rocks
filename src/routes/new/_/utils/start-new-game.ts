import {createGameMap} from '$lib/utils/create-game-map';
import {gameDB} from '$lib/db';
import {goto} from '$app/navigation';

export const startNewGame = async (type: 'normal' | 'wasteland') => {
  const map = createGameMap(type);

  const id = await gameDB.games.add({
    map,
    type,
  } as any);
  await goto(`/${id}/scorecard`);
}

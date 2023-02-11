import {gameDB} from '$lib/db';
import type {Game} from '$lib/models/game';

export const updateInfo = (id: number, info: Required<Game>['info']) => gameDB.transaction('rw', gameDB.games, async () => {
  const game = await gameDB.games.get(id);
  if (!game) {
    throw new Error('not found');
  }

  gameDB.games.update(id, {
    info: {
      ...game.info,
      ...info,
    },
  });
});

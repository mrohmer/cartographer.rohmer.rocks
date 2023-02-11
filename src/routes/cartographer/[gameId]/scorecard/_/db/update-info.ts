import {cartographerDB} from '$lib/db';
import type {Game} from '$lib/models/game';

export const updateInfo = (id: number, info: Required<Game>['info']) => cartographerDB.transaction('rw', cartographerDB.games, async () => {
  const game = await cartographerDB.games.get(id);
  if (!game) {
    throw new Error('not found');
  }

  cartographerDB.games.update(id, {
    info: {
      ...game.info,
      ...info,
    },
  });
});

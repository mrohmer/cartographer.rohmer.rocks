import {cartographerDB} from '$lib/db';

export const toggleCoin = (id: number) => cartographerDB.transaction('rw', cartographerDB.games, async () => {
  const game = await cartographerDB.games.get(id);
  if (!game) {
    throw new Error('not found');
  }

  await cartographerDB.games.update(id, {
    currentRound: {
      ...(game.currentRound ?? {}),
      coin: !game.currentRound?.coin,
    },
  });
})

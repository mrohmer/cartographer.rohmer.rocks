import {gameDB} from '$lib/db';

export const toggleCoin = (id: number) => gameDB.transaction('rw', gameDB.games, async () => {
  const game = await gameDB.games.get(id);
  if (!game) {
    throw new Error('not found');
  }

  await gameDB.games.update(id, {
    currentRound: {
      ...(game.currentRound ?? {}),
      coin: !game.currentRound?.coin,
    },
  });
})

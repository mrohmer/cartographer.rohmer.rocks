import {gameDB} from '$lib/db';
import type {Terrain} from '$lib/models/terrain';

export const changeSelection = (id: number, selection: Terrain) => gameDB.transaction('rw', gameDB.games, async () => {
  const game = await gameDB.games.get(id);
  if (!game) {
    throw new Error('not found');
  }

  if (!selection && game.currentRound?.map?.length) {
    // cannot deselect when map has members
    return
  }

  await gameDB.games.update(id, {
    currentRound: {
      ...(game.currentRound ?? {}),
      selection,
    },
  });
})

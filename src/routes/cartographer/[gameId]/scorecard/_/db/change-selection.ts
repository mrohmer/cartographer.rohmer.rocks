import {cartographerDB} from '$lib/db';
import type {TerrainAndEraser} from '$lib/models/games/cartographer/terrain';

export const changeSelection = (id: number, selection: TerrainAndEraser) => cartographerDB.transaction('rw', cartographerDB.games, async () => {
  const game = await cartographerDB.games.get(id);
  if (!game) {
    throw new Error('not found');
  }

  if (!selection && game.currentRound?.map?.length) {
    // cannot deselect when map has members
    return
  }

  if (selection === 'eraser' && game.currentRound?.map?.length) {
    // cannot select eraser when map has members
    return;
  }
  if (selection !== 'eraser' && game.currentRound?.selection === 'eraser' && game.currentRound?.map?.length) {
    // cannot deselect eraser when map has members
    return;
  }

  await cartographerDB.games.update(id, {
    currentRound: {
      ...(game.currentRound ?? {}),
      selection,
    },
  });
})

import {gameDB} from '$lib/db';

export const toggleCellSelection = (id: number, {x, y}: Record<'x' | 'y', number>) => gameDB.transaction('rw', gameDB.games, async () => {
  const game = await gameDB.games.get(id);
  if (!game) {
    throw new Error('not found');
  }

  if (
    !game?.currentRound?.selection
    || !!game?.map[y]?.[x]?.terrain
  ) {
    return;
  }
  const map = game.currentRound?.map ?? [];

  const included = map.find(cell => cell.x === x && cell.y === y);
  if (included) {
    map.splice(map.indexOf(included), 1);
  } else {
    map.push({x, y});
  }

  await gameDB.games.update(id, {
    currentRound: {
      ...(game.currentRound ?? {}),
      map,
    },
  });
});

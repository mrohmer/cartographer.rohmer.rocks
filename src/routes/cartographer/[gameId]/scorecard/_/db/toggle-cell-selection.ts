import {gameDB} from '$lib/db';
import {staticTerrains} from '$lib/models/terrain';
import {buildMap} from '$lib/utils/build-map';

export const toggleCellSelection = (id: number, {x, y}: Record<'x' | 'y', number>) => gameDB.transaction('rw', gameDB.games, async () => {
  const game = await gameDB.games.get(id);
  if (!game) {
    throw new Error('not found');
  }

  const map = buildMap(game.roundResults);

  if (
    !game?.currentRound?.selection
    || (!!map?.[y]?.[x]?.terrain && game?.currentRound?.selection !== 'eraser')
    || (game?.currentRound?.selection === 'eraser' && (!map?.[y]?.[x]?.terrain || staticTerrains.includes(map?.[y]?.[x]?.terrain as any)))
  ) {
    // no selection
    // cell is empty && selection is eraser
    // cell is taken && selection is buildable terrain
    return;
  }
  const currentMap = game.currentRound?.map ?? [];

  const included = currentMap.find(cell => cell.x === x && cell.y === y);
  if (included) {
    currentMap.splice(currentMap.indexOf(included), 1);
  } else {
    currentMap.push({x, y});
  }

  await gameDB.games.update(id, {
    currentRound: {
      ...(game.currentRound ?? {}),
      map: currentMap,
    },
  });
});

import {cartographerDB} from '$lib/db';
import {staticTerrains} from '$lib/models/games/cartographer/terrain';
import {buildMap} from '$lib/utils/games/cartographer/build-map';

export const toggleCellSelection = (id: number, {x, y}: Record<'x' | 'y', number>) => cartographerDB.transaction('rw', cartographerDB.games, async () => {
  const game = await cartographerDB.games.get(id);
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

  await cartographerDB.games.update(id, {
    currentRound: {
      ...(game.currentRound ?? {}),
      map: currentMap,
    },
  });
});

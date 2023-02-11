import type {GameMap} from '$lib/models/games/cartographer/game-map';
import type {Terrain} from '$lib/models/games/cartographer/terrain';

export const findItemsWithTerrain = (map: GameMap, terrain: Terrain): (Record<'x' | 'y', number> & Record<'terrain', Terrain>)[] => {
  return map
    .map((row, y) => row.map((cell, x) => ({
      x,
      y,
      terrain: cell.terrain,
    })))
    .flat()
    .filter(({terrain: t}) => t === terrain) as (Record<'x' | 'y', number> & Record<'terrain', Terrain>)[];
}

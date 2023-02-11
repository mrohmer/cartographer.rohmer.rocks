import type {GameMap} from '$lib/models/game-map';
import type {Terrain} from '$lib/models/terrain';

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

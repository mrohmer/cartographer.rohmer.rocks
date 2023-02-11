import type {GameMap} from '$lib/models/game-map';
import {countUniqueSurroundings} from '$lib/utils/count-surroundings';
import {findItemsWithTerrain} from './find-items-with-terrain';
import type {Terrain} from '$lib/models/terrain';

export const getMonsterPoints = (map: GameMap): number => {
  if (!map) {
    return 0;
  }

  const monsterPositions = findItemsWithTerrain(map, 'monster' as Terrain);

  return countUniqueSurroundings(map, monsterPositions, undefined, {neglectOutOfBounds: true});
}

import type {GameRoundResult} from '../../../models/games/cartographer/game-round-result';
import type {GameMap} from '../../../models/games/cartographer/game-map';

const mergeMaps = (map1: GameMap, map2: GameMap): GameMap =>
  map2.map((row, y) => row.map((cell, x) => ({
    ...cell,
    terrain: cell.terrain ?? map1?.[y]?.[x]?.terrain,
  }))) as GameMap;

export const buildMap = (results: GameRoundResult[]|undefined): GameMap| undefined =>
  results?.reduce(
    (prev, curr) => {
      if (!curr?.map || !prev) {
        return prev ?? curr?.map;
      }
      return mergeMaps(prev, curr.map)
    },
    undefined as GameMap|undefined,
  );

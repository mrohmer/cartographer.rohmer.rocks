import type {GameMap} from './game-map';
import type {Terrain} from './terrain';

export interface Game {
  id?: number;
  map: GameMap;
  roundResults?: {
    coins?: number;
    monsterPoints?: number;
    points0?: number;
    points1?: number;
  }[];
  round?: 0|1|2|3;
  currentRound?: {
    selection?: Terrain;
    map?: Record<'x'|'y', number>[];
    coin?: boolean;
  }
}

import type {GameMap} from './game-map';
import type {Terrain} from './terrain';

export interface Game {
  id?: number;
  map: GameMap;
  currentRound?: {
    selection?: Terrain;
    map?: Record<'x'|'y', number>[];
    coin?: boolean;
  }
}

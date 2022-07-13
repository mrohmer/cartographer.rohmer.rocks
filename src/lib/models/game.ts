import type {GameMap} from './game-map';
import type {Terrain} from './terrain';
import type {GameRoundResult} from './game-round-result';

export interface Game {
  id?: number;
  map: GameMap;
  roundResults?: GameRoundResult[];
  round?: 0|1|2|3;
  created: Date;
  updated: Date;
  currentRound?: {
    selection?: Terrain;
    map?: Record<'x'|'y', number>[];
    coin?: boolean;
  }
  info?: Partial<Record<'name'|'title'|'country', string>>;
}

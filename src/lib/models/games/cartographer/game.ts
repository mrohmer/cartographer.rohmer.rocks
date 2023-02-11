import type {GameMap} from './game-map';
import type {TerrainAndEraser} from './terrain';
import type {GameRoundResult} from './game-round-result';

export interface Game {
  id?: number;
  type: 'normal'|'wasteland';
  roundResults?: GameRoundResult[];
  round?: 0|1|2|3;
  created: Date;
  updated: Date;
  currentRound?: {
    selection?: TerrainAndEraser;
    map?: Record<'x'|'y', number>[];
    coin?: boolean;
  }
  info?: Partial<Record<'name'|'title'|'country', string>>;
}

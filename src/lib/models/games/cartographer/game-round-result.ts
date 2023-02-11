import type {GameMap} from './game-map';

export interface GameRoundResult {
  coins?: Partial<Record<'normal' | 'mountain', number>>;
  monsterPoints?: number;
  points0?: number;
  points1?: number;
  map?: GameMap;
}

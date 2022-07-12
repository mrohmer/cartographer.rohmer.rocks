export interface GameRoundResult {
  coins?: number;
  mountainsScored?: Record<'x' | 'y', number>[]
  monsterPoints?: number;
  points0?: number;
  points1?: number;
}

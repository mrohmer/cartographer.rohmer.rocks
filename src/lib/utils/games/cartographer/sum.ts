import type {GameRoundResult} from '../../../models/games/cartographer/game-round-result';

export const sum = (...args: (number | undefined)[]) => args.reduce((prev: number, curr) => prev + (typeof curr === 'number' ? curr! : 0), 0);

export const sumRoundResult = (result: GameRoundResult): number => sum(
  result?.coins?.normal,
  result?.coins?.mountain,
  result?.points0,
  result?.points1,
  -(result?.monsterPoints ?? 0)
);
export const sumRoundResults = (results: GameRoundResult[]): number => sum(...results.map(sumRoundResult));

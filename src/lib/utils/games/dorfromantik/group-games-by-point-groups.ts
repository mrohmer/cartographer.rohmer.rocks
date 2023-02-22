import type {DorfromantikGame} from '../../../models/games/dorfromantik/game';
import {calcGameResults} from './calc-game-results';


export const groups: Record<number, number> = {
  0: 1,
  100: 2,
  110: 3,
  120: 3,
  130: 4,
  140: 4,
  150: 5,
  160: 5,
  170: 6,
  180: 6,
  190: 7,
  200: 7,
  210: 8,
  220: 8,
  230: 9,
  240: 9,
  250: 10,
  260: 10,
  270: 11,
  280: 11,
  290: 12,
  300: 12,
  310: 13,
  320: 13,
  330: 14,
  340: 14,
  350: 15,
  375: 15,
  400: 15,
};
const stepsMinMax = Object.keys(groups)
  .sort()
  .map((points, index, arr) => [points, +(arr[index + 1] ?? Number.MAX_SAFE_INTEGER) - 1]);
export const groupGamesByPointGroups = (games: DorfromantikGame[]) => {
  if (!games.length) {
    return {};
  }
  const sorted = games
    .sort(({id: a}, {id: b}) => Math.sign(b! - a!));
  const points = sorted
    .map(game => calcGameResults(game.results)?.total);

  return points
    .map((p, index) => [index + 1, stepsMinMax.find(([min, max]) => p >= min && p <= max)?.[0] as number])
    .reduce(
      (prev, [game, group]) => ({
        ...prev,
        [group!]: [
          ...(prev[group!] ?? []),
          game,
        ]
      }),
      {} as Record<string, number[]>,
    )
}

import type {Game} from '$lib/models/game';
import type {Terrain} from '$lib/models/terrain';

export const buildCurrentSelectionMap = (game: Game): Record<string, Record<string, Record<'terrain', Terrain>>> | undefined => {
  if (!game) {
    return undefined;
  }
  const terrain = game.currentRound?.selection;
  const map = game.currentRound?.map ?? [];

  return map.reduce((prev, {y, x}) => ({
    ...prev,
    [y]: {
      ...(prev[y] ?? {}),
      [x]: {terrain},
    },
  }), {} as Record<string, Record<string, Terrain>>);
}

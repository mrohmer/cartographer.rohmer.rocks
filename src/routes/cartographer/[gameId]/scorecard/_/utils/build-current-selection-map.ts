import type {Game} from '$lib/models/game';
import type {TerrainAndEraser} from '$lib/models/terrain';

export const buildCurrentSelectionMap = (currentRound: Required<Game>['currentRound']): Record<string, Record<string, Record<'terrain', TerrainAndEraser>>> | undefined => {
  if (!currentRound) {
    return undefined
  }
  const terrain = currentRound?.selection;
  const map = currentRound?.map ?? [];

  return map.reduce((prev, {y, x}) => ({
    ...prev,
    [y]: {
      ...(prev[y] ?? {}),
      [x]: {terrain},
    },
  }), {} as Record<string, Record<string, Record<'terrain', TerrainAndEraser>>>);
}

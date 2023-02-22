import type {DorfromantikGame} from '../../../models/games/dorfromantik/game';
import {groupGamesByPointGroups, groups} from './group-games-by-point-groups';

export const calcAllCampaignPathSteps = (games: DorfromantikGame[]) => {
  const grouped = groupGamesByPointGroups(games);

  return Object.entries(grouped)
    .map(([key, value]) => (groups[+key] ?? 0) * value.length)
    .reduce((prev, curr) => prev + curr)
}

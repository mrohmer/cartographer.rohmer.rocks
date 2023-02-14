import type {DorfromantikGame} from '../../../models/games/dorfromantik/game';

export const sum = (...data: (number|undefined)[]) => data.reduce(
  (prev, curr) => (prev ?? 0) + (curr ?? 0),
  0,
) ?? 0;

export const calcGameResults = (results: DorfromantikGame['results']): Record<`total${'' | 'Orders' | 'FlagsAndLongest' | 'Unlocked'}`, number> => {
  const totalOrders = sum(
    results?.orders?.forest,
    results?.orders?.field,
    results?.orders?.house,
    results?.orders?.rail,
    results?.orders?.river,
  );
  const totalFlagsAndLongest = sum(
    results?.flags?.forest,
    results?.flags?.field,
    results?.flags?.house,
    results?.longest?.rail,
    results?.longest?.river,
  );
  const totalUnlocked = sum(
    results?.unlocked?.circus,
    results?.unlocked?.signalman,
    results?.unlocked?.shephard,
    results?.unlocked?.hill,
    results?.unlocked?.constructionSite,
    results?.unlocked?.balloonLaunchSide,
    results?.unlocked?.goldenHeart,
    results?.unlocked?.forestHut,
    results?.unlocked?.harvestFestival,
    results?.unlocked?.watchtower,
    results?.unlocked?.locomotive,
    results?.unlocked?.boat,
    results?.unlocked?.railroadStation,
    results?.unlocked?.harbor,
  );
  const total = sum(
    totalOrders,
    totalFlagsAndLongest,
    totalUnlocked,
  );

  return {
    total,
    totalOrders,
    totalFlagsAndLongest,
    totalUnlocked,
  }
}

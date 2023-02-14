import type {DorfromantikLandType} from './land-type';
import type {DorfromantikRouteType} from './route-type';
import type {DorfromantikBoxAchievement, DorfromantikCampaignPathAchievement} from './achievement';

export interface DorfromantikGame {
  id?: number;
  created: Date;
  updated: Date;

  campaignId: number;

  number: number;

  players?: string[];

  results?: {
    orders?: Partial<Record<DorfromantikLandType | DorfromantikRouteType, number>>;
    flags?: Partial<Record<DorfromantikLandType, number>>;
    longest?: Partial<Record<DorfromantikRouteType, number>>;
    unlocked?: Partial<Record<UnlockedType, number>>;
  };
}

export type UnlockedType =
  DorfromantikCampaignPathAchievement.CIRCUS
  | DorfromantikCampaignPathAchievement.SIGNALMAN
  | DorfromantikCampaignPathAchievement.SHEPHARD
  | DorfromantikCampaignPathAchievement.HILL
  | DorfromantikBoxAchievement.RED_HEART
  | DorfromantikBoxAchievement.CONSTRUCTION_AREA
  | DorfromantikBoxAchievement.BALLOON_LAUNCH_SIDE
  | DorfromantikBoxAchievement.GOLDEN_HEART
  | DorfromantikBoxAchievement.FOREST_HUT
  | DorfromantikBoxAchievement.HARVEST_FESTIVAL
  | DorfromantikBoxAchievement.WATCH_TOWER
  | DorfromantikBoxAchievement.LOCOMOTIVE
  | DorfromantikBoxAchievement.BOAT
  | DorfromantikBoxAchievement.RAILROAD_STATION
  | DorfromantikBoxAchievement.HARBOR;

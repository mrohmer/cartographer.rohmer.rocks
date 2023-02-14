export interface DorfromantikGame {
  id?: number;
  created: Date;
  updated: Date;

  campaignId: number;

  number: number;

  players?: string[];

  results?: {
    orders?: Partial<Record<LandType|RouteType, number>>;
    flags?: Partial<Record<LandType, number>>;
    longest?: Partial<Record<RouteType, number>>;
    unlocked?: Partial<Record<UnlockedType, number>>;
  };
}

export type LandType = 'forest'|'field'|'house';
export type RouteType = 'rail'|'river';
export type UnlockedType = 'redHeart'
  |'circus'
  |'signalman'
  |'shephard'
  |'hill'
  |'constructionSite'
  | 'balloonLaunchSide'
  |'goldenHeart'
  |'forestHut'
  |'harvestFestival'
  |'watchtower'
  |'locomotive'
  |'boat'
  |'railroadStation'
  |'harbor';

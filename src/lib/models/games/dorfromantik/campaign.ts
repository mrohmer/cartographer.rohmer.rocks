export interface DorfromantikCampaign {
  id?: number;
  created: Date;
  updated: Date;
  name?: string;
  players?: string[];

  boxAchievements?: Partial<Record<
    'onTheRoadToSuccess'
    | 'railroadStation'
    | 'balloonLaunchSide'
    | 'constructionArea'
    | 'harvestFestival'
    | 'goldenHeart'
    | 'harbor'
    | 'heartsDesires'
    | 'locomotive'
    | 'readHeart'
    | 'boat'
    | 'watchtower'
    | 'forestHut',
    boolean
  >>;
}

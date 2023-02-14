import type {DorfromantikBoxAchievement, DorfromantikCampaignPathAchievement} from './achievement';

export interface DorfromantikCampaign {
  id?: number;
  created: Date;
  updated: Date;
  name?: string;
  players?: string[];

  boxAchievements?: Achievements<DorfromantikBoxAchievement>;
  campaignPathAchievements?: Achievements<DorfromantikCampaignPathAchievement>;
}


type Achievements<
  T extends DorfromantikBoxAchievement | DorfromantikCampaignPathAchievement
>
  = Partial<Record<T, number>>

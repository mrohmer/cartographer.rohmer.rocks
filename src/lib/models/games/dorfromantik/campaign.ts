import type {DorfromantikBoxAchievement, DorfromantikCampaignPathAchievement} from './achievement';

export interface DorfromantikCampaign {
  id?: number;
  created: Date;
  updated: Date;
  name?: string;
  players?: string[];

  boxAchievements?: Achievements<DorfromantikBoxAchievement>;
  campaignPathAchievements?: Achievements<DorfromantikCampaignPathAchievement>;

  campaignPath?: [
    CampaignPathValues<2>,
    CampaignPathValues<4>,
    FixedLengthArray<CampaignPathValues<4>, 2>,
    FixedLengthArray<CampaignPathValues<6>, 4>,
    FixedLengthArray<CampaignPathValues<7>, 3>,
    FixedLengthArray<CampaignPathValues<10>, 3>,
    FixedLengthArray<CampaignPathValues<10>, 3>,
  ]
}


type Achievements<
  T extends DorfromantikBoxAchievement | DorfromantikCampaignPathAchievement
>
  = Partial<Record<T, number>>

type Grow<T, A extends Array<T>> =
  ((x: T, ...xs: A) => void) extends ((...a: infer X) => void) ? X : never;
type GrowToSize<T, A extends Array<T>, N extends number> =
  { 0: A, 1: GrowToSize<T, Grow<T, A>, N> }[A['length'] extends N ? 0 : 1];

export type FixedLengthArray<T, N extends number> = GrowToSize<T, [], N>
export type CampaignPathValues<N extends number> = FixedLengthArray<boolean, N>;

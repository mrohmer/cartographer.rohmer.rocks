import Dexie from 'dexie';
import type {Game} from '../../models/games/cartographer/game';
import type {DorfromantikCampaign} from '../../models/games/dorfromantik/campaign';
import type {DorfromantikGame} from '../../models/games/dorfromantik/game';

export class DorfromantikDb extends Dexie {

  campaigns!: Dexie.Table<DorfromantikCampaign, number>;
  games!: Dexie.Table<DorfromantikGame, number>;

  constructor() {
    super('dorfromantik');
    this.version(1).stores({
      campaigns: '++id',
      games: '++id, campaignId',
    });

    [this.campaigns, this.games].forEach(t => {
      t.hook('creating', (_, i) => {
        i.created = new Date();
        i.updated = new Date();
      });
      t.hook('updating', (modifications) => ({
        ...modifications,
        updated: new Date(),
      }));
    });
  }
}

export const dorfromantikDB = new DorfromantikDb();

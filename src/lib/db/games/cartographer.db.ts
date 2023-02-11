import Dexie from 'dexie';
import type {Game} from '../../models/game';

export class CartographerDB extends Dexie {

  games!: Dexie.Table<Game, number>;

  constructor() {
    super('cartographer');
    this.version(1).stores({
      games: '++id'
    });

    this.games.hook('creating', (_, game) => {
      game.created = new Date();
    });
    this.games.hook('updating', (modifications) => ({
        ...modifications,
        updated: new Date(),
    }));
  }
}

export const cartographerDB = new CartographerDB();

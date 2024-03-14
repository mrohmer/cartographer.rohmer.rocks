import Dexie from 'dexie';
import type {Game} from '../../models/games/beear-and-bread/game';

export class BeerAndBreadDb extends Dexie {

  games!: Dexie.Table<Game, number>;

  constructor() {
    super('beer-and-bread');
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

export const beerAndBreadDb = new BeerAndBreadDb();

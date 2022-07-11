import Dexie from 'dexie';
import type {Game} from '../models/game';

export class GameDB extends Dexie {

  games!: Dexie.Table<Game, number>;

  constructor() {
    super('games');
    this.version(1).stores({
      games: '++id'
    });
  }
}

export const gameDB = new GameDB();

import type {GamePlayerState} from '$lib/models/games/beear-and-bread/game-player-state';

export interface Game {
  id?: number;
  created: Date;
  updated: Date;

  state: [GamePlayerState, GamePlayerState];
}

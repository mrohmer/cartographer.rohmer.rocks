import {gameDB} from '$lib/db';
import type {GameRoundResult} from '$lib/models/game-round-result';

export const updateResult = (id: number, round: number, roundResult: GameRoundResult) => gameDB.transaction('rw', gameDB.games, async () => {
  const game = await gameDB.games.get(id);
  if (!game) {
    throw new Error('not found');
  }

  const original = game.roundResults ?? [];

  if (original.length < round - 1) {
    return; // dafuq
  }

  if (original.length < round) {
    original.push(roundResult);
  } else {
    original[round] = roundResult;
  }

  gameDB.games.update(id, {
    roundResults: original,
  });
})

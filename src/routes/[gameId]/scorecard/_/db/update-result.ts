import {gameDB} from '$lib/db';
import type {GameRoundResult} from '$lib/models/game-round-result';

const sanitizePoints = (points: number | undefined): number | undefined => points !== undefined && !isNaN(points) && points >= 0 ? points : (points === undefined ? undefined : 0);

export const updateResult = (id: number, round: number, roundResult: GameRoundResult) => gameDB.transaction('rw', gameDB.games, async () => {
  const game = await gameDB.games.get(id);
  if (!game) {
    throw new Error('not found');
  }

  roundResult = {
    ...roundResult,
    points0: sanitizePoints(roundResult.points0),
    points1: sanitizePoints(roundResult.points1),
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

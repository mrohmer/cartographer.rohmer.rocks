import {gameDB} from '../../../../../lib/db';
import {persistTransactionless} from './persist';

export const advanceToNextRound = (id: number) => gameDB.transaction('rw', gameDB.games, async () => {
  const game = await gameDB.games.get(id);
  if (!game) {
    throw new Error('not found');
  }

  if (!!game.round && game.round > 4) {
    return;
  }

  await persistTransactionless(id);
  const roundResults = game.roundResults ?? [];

  while (roundResults.length < (game.round ?? 0)) {
    roundResults.push({});
  }

  await gameDB.games.update(id, {
    roundResults,
    currentRound: undefined,
    round: (game.round ?? 0) + 1,
  });
})

import {gameDB} from '$lib/db';
import {buildCurrentSelectionMap, findItemsWithTerrain, getMonsterPoints} from '../utils';
import {countSurroundings} from '$lib/utils/count-surroundings';
import type {Terrain} from '$lib/models/terrain';
import type {GameMap} from '$lib/models/game-map';

export const persistTransactionless = async (id: number) => {
  const game = await gameDB.games.get(id);
  if (!game) {
    throw new Error('not found');
  }
  if (!game?.currentRound?.map?.length && !game?.currentRound?.coin) {
    return;
  }

  const selectedMap = buildCurrentSelectionMap(game);

  const map = game.map.map((row, y) => row.map((cell, x) => {
    if (selectedMap?.[y]?.[x]?.terrain === 'eraser') {
      return {
        ...cell,
        terrain: undefined,
      }
    }
    return {
      ...cell,
      terrain: selectedMap?.[y]?.[x]?.terrain ?? cell.terrain,
    }
  })) as GameMap;

  const roundResults = [...(game.roundResults ?? []).map(round => ({...round}))];
  const round = game.round ?? 0;

  if (game.currentRound?.coin) {
    roundResults[round] = roundResults[round] ?? {coins: 0};
    const coins = roundResults[round].coins ?? 0;
    roundResults[round].coins = (typeof coins === 'number' && !isNaN(coins) ? coins : 0) + 1;
  }

  const mountainsScored = roundResults?.filter((r, i) => r && i <= round).map(r => r?.mountainsScored ?? []).flat() ?? [];
  const unscoredMountains = findItemsWithTerrain(map, 'mountain' as Terrain)
    .filter(({x, y}) => !mountainsScored.find(({x: mx, y: my}) => mx === x && my === y))
    .filter(mountain => countSurroundings(map, mountain, 'NOT_EMPTY') === 4)
    .map(({x, y}) => ({x, y}))
  ;

  if (unscoredMountains.length) {
    roundResults[round] = roundResults[round] ?? {};
    roundResults[round].mountainsScored = [...(roundResults[round].mountainsScored ?? []), ...unscoredMountains];
  }

  const monsterPoints = getMonsterPoints(map);
  if (monsterPoints) {
    roundResults[round] = roundResults[round] ?? {};
    roundResults[round].monsterPoints = monsterPoints
  }

  await gameDB.games.update(id, {
    currentRound: undefined,
    roundResults: roundResults.length ? roundResults : undefined,
    map,
  });
}
export const persist = async (id: number) => gameDB.transaction('rw', gameDB.games, () => persistTransactionless(id));

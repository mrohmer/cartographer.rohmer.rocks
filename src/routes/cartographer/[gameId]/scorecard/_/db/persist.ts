import {cartographerDB} from '$lib/db';
import {buildCurrentSelectionMap, findItemsWithTerrain, getMonsterPoints} from '../utils';
import {countSurroundings} from '$lib/utils/games/cartographer/count-surroundings';
import type {GameMap} from '$lib/models/games/cartographer/game-map';
import {buildMap} from '$lib/utils/games/cartographer/build-map';
import {createGameMap} from '$lib/utils/games/cartographer/create-game-map';

const getMountainCoins = (map: GameMap): number => findItemsWithTerrain(map, 'mountain')
  .filter(mountain => countSurroundings(map!, mountain, 'NOT_EMPTY') === 4)
  .length;

export const persistTransactionless = async (id: number) => {
  const game = await cartographerDB.games.get(id);
  if (!game) {
    throw new Error('not found');
  }
  if (!game?.currentRound?.map?.length && !game?.currentRound?.coin) {
    return;
  }

  const selectedMap = buildCurrentSelectionMap(game?.currentRound);

  let roundResults = [...(game.roundResults ?? []).map(round => ({...round}))];
  const round = game.round ?? 0;
  roundResults[round] = roundResults[round] ?? {};
  roundResults[round].map = roundResults[round].map ?? createGameMap(game.type);

  if (game.currentRound.selection === 'eraser') {
    roundResults = roundResults.map(result => ({
      ...result,
      map: result.map?.map((row, y) => row.map((cell, x) => ({
        ...cell,
        terrain: selectedMap?.[y]?.[x]?.terrain ? undefined : cell.terrain,
      }))) as GameMap,
    }));
  } else {
    roundResults[round].map = (roundResults[round].map ?? createGameMap(game.type) as GameMap)
      .map((row, y) => row.map((cell, x) => ({
        ...cell,
        terrain: selectedMap?.[y]?.[x]?.terrain ?? cell.terrain,
      }))) as GameMap;
  }


  if (game.currentRound?.coin) {
    const coins = roundResults[round].coins?.normal ?? 0;
    roundResults[round].coins = {
      ...(roundResults[round].coins ?? {}),
      normal: (typeof coins === 'number' && !isNaN(coins) ? coins : 0) + 1
    };
  }

  roundResults = roundResults.map((result, i) => {
    const previousMap = buildMap(roundResults.slice(0, i));
    const completeMap = buildMap(roundResults.slice(0, i + 1));

    const allMountainCoins = completeMap
      ? getMountainCoins(completeMap)
      : 0;
    const previousMountainCoins = previousMap
      ? getMountainCoins(previousMap)
      : 0;

    const mountainCoins = allMountainCoins - previousMountainCoins;

    return {
      ...result,
      coins: {
        ...(result.coins ?? {}),
        mountain: mountainCoins ? mountainCoins : undefined,
      },
      monsterPoints: completeMap ? getMonsterPoints(completeMap) : 0,
    }
  });

  await cartographerDB.games.update(id, {
    currentRound: undefined,
    roundResults: roundResults.length ? roundResults : undefined,
  });
}
export const persist = async (id: number) => cartographerDB.transaction('rw', cartographerDB.games, () => persistTransactionless(id));

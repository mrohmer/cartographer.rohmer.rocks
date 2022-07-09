import type {GameMap} from '../models/GameMap';

export const createGameMap = (type: 'normal' | 'wasteland' = 'normal'): GameMap => {
  const row = Array.from(Array(11)).map(() => ({
    terrain: undefined,
    isRuin: false,
  })) as GameMap[number];

  const map = Array.from(Array(11)).map(() => row.map(i => ({...i}))) as GameMap;

  if (type === 'wasteland') {
    return addTerrainsForWastelandMap(map);
  }

  return addTerrainsForNormalMap(map);
}

const addTerrainsForNormalMap = (map: GameMap): GameMap => {
  map[1][5].isRuin = true;
  map[2][1].isRuin = true;
  map[2][9].isRuin = true;
  map[8][1].isRuin = true;
  map[8][9].isRuin = true;
  map[9][5].isRuin = true;

  map[1][3].terrain = 'mountain';
  map[2][8].terrain = 'mountain';
  map[5][5].terrain = 'mountain';
  map[8][2].terrain = 'mountain';
  map[9][7].terrain = 'mountain';

  return map;
}
const addTerrainsForWastelandMap = (map: GameMap): GameMap => {
  map[3][5].terrain = 'wasteland';
  map[4][4].terrain = 'wasteland';
  map[4][5].terrain = 'wasteland';
  map[5][4].terrain = 'wasteland';
  map[5][5].terrain = 'wasteland';
  map[5][6].terrain = 'wasteland';
  map[6][5].terrain = 'wasteland';

  map[2][2].isRuin = true;
  map[1][6].isRuin = true;
  map[4][6].isRuin = true;
  map[6][1].isRuin = true;
  map[7][8].isRuin = true;
  map[9][3].isRuin = true;

  map[1][8].terrain = 'mountain';
  map[2][3].terrain = 'mountain';
  map[7][5].terrain = 'mountain';
  map[8][9].terrain = 'mountain';
  map[9][2].terrain = 'mountain';

  return map;
}

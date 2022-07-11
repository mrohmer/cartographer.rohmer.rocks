import type {GameMap} from '../models/game-map';
import type {Terrain} from '../models/terrain';

type Type = Terrain|undefined|'NOT_EMPTY';
type Surrounding = Record<'x'|'y', number> & Record<'terrain', Terrain|undefined>;
const getSurroundings = (map: GameMap, position: Record<'x'|'y', number>): Surrounding[] => {
  const {x, y} = position;

  return [
      y > 0 ? {x, y: y - 1, terrain: map[y - 1]?.[x]?.terrain} : 'OUT_OF_BOUNDS',
      x < map.length - 1 ? {x: x + 1, y, terrain: map[y]?.[x + 1]?.terrain } : 'OUT_OF_BOUNDS',
      y < map.length - 1 ? {x, y: y + 1, terrain: map[y + 1]?.[x]?.terrain} : 'OUT_OF_BOUNDS',
      x > 0 ? {x: x - 1, y, terrain: map[y]?.[x - 1]?.terrain} : 'OUT_OF_BOUNDS',
    ]
      .filter(i => i !== 'OUT_OF_BOUNDS') as Surrounding[]
  ;
}
const count = (surroundings: Surrounding[], types: Type|Type[], options?: Partial<Record<'neglectOutOfBounds', boolean>>): number => {
  const typesArray = Array.isArray(types) ? types : [types];
  return surroundings
    .map(surrounding => typesArray.includes(surrounding?.terrain) || (typesArray.includes('NOT_EMPTY') && surrounding?.terrain !== undefined))
    .reduce((prev, curr) => prev + (curr ? 1 : 0), 0) + (!options?.neglectOutOfBounds ? 4 - surroundings.length : 0);
}
export const countUniqueSurroundings = (map: GameMap, positions: Record<'x'|'y', number>[], types: Type|Type[], options?: Partial<Record<'neglectOutOfBounds', boolean>>): number => {
  const surroundings = positions.map(position => getSurroundings(map, position)).flat();

  const surroundingsMap: Record<string, Surrounding> = {};
  surroundings.forEach(surrounding => surroundingsMap[`${surrounding.y}---${surrounding.x}`] = surrounding)

  return count(Object.values(surroundingsMap), types, options);
}
export const countSurroundings = (map: GameMap, position: Record<'x'|'y', number>, types: Type|Type[], options?: Partial<Record<'neglectOutOfBounds', boolean>>): number => {
  const surroundings = getSurroundings(map, position);

  return count(surroundings, types, options);
}

import type {Terrain} from './Terrain';

interface MapColumn {
  terrain: Terrain|undefined;
  isRuin: boolean;
}

type MapRow = [
  MapColumn,
  MapColumn,
  MapColumn,
  MapColumn,
  MapColumn,
  MapColumn,
  MapColumn,
  MapColumn,
  MapColumn,
  MapColumn,
  MapColumn,
];
export type GameMap = [
  MapRow,
  MapRow,
  MapRow,
  MapRow,
  MapRow,
  MapRow,
  MapRow,
  MapRow,
  MapRow,
  MapRow,
  MapRow,
];

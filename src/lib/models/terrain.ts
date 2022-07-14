export const buildableTerrains = [
  'forest',
  'village',
  'farm',
  'water',
  'monster',
] as const;
export const staticTerrains = [
  'mountain',
  'wasteland',
] as const;
export type Terrain = typeof buildableTerrains[number] | typeof staticTerrains[number];
export type Eraser = 'eraser';
export type TerrainAndEraser = Terrain | Eraser;

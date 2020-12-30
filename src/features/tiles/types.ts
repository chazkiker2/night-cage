export interface TileMap {
  [key: number]: Tile;
}

export interface Tile {
  id: number;
  name: string;
  directions: Direction[];
  turnsToPit: boolean;
  willBePit: boolean;
  active: boolean;
  player: string | null;
  location?: number;
}

export interface GameState {
  bag: Array<Tile>;
  queue: Array<Tile>;
  board: TileMap;
  selected: Tile | null;
}

export type Direction = "up" | "right" | "down" | "left";


export interface TileMap {
  [key: number]: Tile;
}

export type Option = {
  next: number;
  valid?: boolean;
}
export interface BoardOptionsMap {
  [key: string]: Option;
  up: Option;
  right: Option;
  down: Option;
  left: Option;
}

// export type Board2d = Tile[];

export type PositionMap = {
  [key: number]: Direction[];
  0: Direction[];
  90: Direction[];
  180: Direction[];
  270: Direction[];
}
export interface Tile {
  id: number;
  name: string;
  // directions: Direction[];
  turnsToPit: boolean;
  willBePit: boolean;
  active: boolean;
  player: Colors | null;
  location?: number;
  location2d: [number, number];
  currentPosition: 0 | 90 | 180 | 270;
  positionMap: PositionMap;
}

export interface PlayerTile {
  id: Colors;
}

export interface GameState {
  bag: Array<Tile>;
  queue: Array<Tile>;
  board: TileMap;
  selected: Tile | null;
  selectedPlayer?: PlayerTile | null;
  players: PlayersState;
  board2d: Tile[][];
}

export type Direction = "up" | "right" | "down" | "left";

export type Player = {
  tile: PlayerTile;
  color: Colors;
  location: number;
  options: Direction[];
  isLit: boolean;
  nerveCount: number;
};

export type Colors = "red" | "blue" | "green" | "yellow";

export type PlayersState = {
  [key: string]: any;
  turnOrder: {
    [key: number]: Colors;
    0: "red",
    1: "blue",
    2: "green",
    3: "yellow",
  }
  red: Player;
  blue: Player,
  yellow: Player,
  green: Player,
  playing: Colors,
}

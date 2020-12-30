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
  players: PlayersState;
}

export type Direction = "up" | "right" | "down" | "left";

export type Player = {
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

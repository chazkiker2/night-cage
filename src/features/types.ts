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
  turnsToPit: boolean;
  illuminated: Color[];
  active: boolean;
  player: Color | null;
  location: [number, number];
  currentPosition: 0 | 90 | 180 | 270;
  positionMap: PositionMap;
}

export interface PlayerTile {
  id: Color;
}

export interface GameState {
  bag: Tile[];
  queue: Tile[];
  discard: Tile[];
  selected: Tile | null;
  selectedPlayer?: PlayerTile | null;
  players: PlayersState;
  board: Tile[][];
}

export type Direction = "up" | "right" | "down" | "left" | "stay";

export type Color = "red" | "blue" | "green" | "yellow";

export type Player = {
  tile: PlayerTile;
  color: Color;
  location: [number, number];
  options: Direction[];
  hasKey: boolean;
  isLit: boolean;
  nerveCount: number;
};


export type PlayersState = {
  [key: string]: any;
  turnOrder: {
    [key: number]: Color;
    0: "red",
    1: "blue",
    2: "green",
    3: "yellow",
  }
  red: Player;
  blue: Player,
  yellow: Player,
  green: Player,
  playing: Color,
}

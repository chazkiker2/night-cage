import { Player } from "../player/types";

export interface TileMap {
  [key: number]: Tile;
}

export type Direction = "up" | "right" | "down" | "left";

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
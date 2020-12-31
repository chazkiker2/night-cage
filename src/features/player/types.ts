export type Player = {
  color: Colors;
  location: number;
  options: Direction[];
  isLit: boolean;
  nerveCount: number;
};

export type Colors = "red" | "blue" | "green" | "yellow";
export type Direction = "up" | "right" | "down" | "left";

export type State = {
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
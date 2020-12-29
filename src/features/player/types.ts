export type Player = {
  color: "red" | "blue" | "green" | "yellow";
  location: number;
  options: Direction[];
  isLit: boolean;
  nerveCount: number;
};

export type Direction = "up" | "right" | "down" | "left";

export type State = {
  [key: string]: any;
  red: Player;
  green: Player,
  yellow: Player,
  blue: Player,
  playing: "red" | "blue" | "green" | "yellow",
}
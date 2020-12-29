export type Player = {
  color: "red" | "blue" | "green" | "yellow";
  location: number;
  options: Array<"up" | "down" | "left" | "right" | undefined>;
  isLit: boolean;
  nerveCount: number;
};


export type State = {
  [key: string]: any;
  red: Player;
  green: Player,
  yellow: Player,
  blue: Player,
  playing: Player,
}
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Player, State } from "./types";
import { setPlayer } from "../tiles/tileSlice";
// type Player = {
//   color: "red" | "blue" | "green" | "yellow";
//   location: number;
//   options: Array<"up" | "down" | "left" | "right" | undefined>;
//   isLit: boolean;
//   nerveCount: number;
// };

const PlayerR: Player = {
  color: "red",
  location: -1,
  options: [],
  isLit: true,
  nerveCount: 1,
}
const PlayerG: Player = {
  color: "green",
  location: -1,
  options: [],
  isLit: true,
  nerveCount: 1,
}
const PlayerB: Player = {
  color: "blue",
  location: -1,
  options: [],
  isLit: true,
  nerveCount: 1,
}
const PlayerY: Player = {
  color: "yellow",
  location: -1,
  options: [],
  isLit: true,
  nerveCount: 1,
}

// type PlayerState = {
//   [key: string]: any;
//   red: Player;
//   green: Player,
//   yellow: Player,
//   blue: Player,
//   playing: Player,
// };

const initialState: State = {
  red: PlayerR,
  green: PlayerG,
  blue: PlayerB,
  yellow: PlayerY,
  playing: PlayerR
}

export const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setPlayer, (state, action) => {
      const { location, player } = action.payload;
      console.log({ state, action });
      state[player.color].location = location;
    })
  }

})

// export const { setPlayerLocation } = playerSlice.actions;

export const selectPlayers = (state: RootState) => state.players;
export default playerSlice.reducer;
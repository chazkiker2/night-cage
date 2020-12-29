import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Player, State, Direction } from "./types";
import { setPlayer } from "../tiles/tileSlice";

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
  playing: "red",
}

export const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    // setPlayerLocation: (state, action: PayloadAction<{ location: number, options: Direction[] }>) => {
    //   const { location, options } = action.payload;
    //   const i = (state.playing.color).toString();
    //   state[i].location = location;
    //   state[i].options = options;
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(setPlayer, (state, action) => {
      const { location, playerColor } = action.payload;
      console.log({ state, action });
      state[playerColor].location = location;
    })
  }

})

// export const { setPlayerLocation } = playerSlice.actions;

export const selectPlayers = (state: RootState) => state.players;
export default playerSlice.reducer;
import React from "react";

type Props = {
  children?: React.ReactNode
}

const PSlice: React.FC<Props> = ({ children }) => {
  return (
    <div></div>
  );
}


// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../../app/store";
// import { Player, State, Direction } from "./types";
// import { setPlayer } from "../tiles/gameSlice";

// const PlayerR: Player = {
//   color: "red",
//   location: -1,
//   options: [],
//   isLit: true,
//   nerveCount: 1,
// }
// const PlayerG: Player = {
//   color: "green",
//   location: -1,
//   options: [],
//   isLit: true,
//   nerveCount: 1,
// }
// const PlayerB: Player = {
//   color: "blue",
//   location: -1,
//   options: [],
//   isLit: true,
//   nerveCount: 1,
// }
// const PlayerY: Player = {
//   color: "yellow",
//   location: -1,
//   options: [],
//   isLit: true,
//   nerveCount: 1,
// }

// // type PlayerState = {
// //   [key: string]: any;
// //   red: Player;
// //   green: Player,
// //   yellow: Player,
// //   blue: Player,
// //   playing: Player,
// // };

// const initialState: State = {
//   turnOrder: {
//     0: "red",
//     1: "blue",
//     2: "green",
//     3: "yellow"
//   },
//   red: PlayerR,
//   green: PlayerG,
//   blue: PlayerB,
//   yellow: PlayerY,
//   playCount: 0,
//   playing: "red",
// }

// export const playerSlice = createSlice({
//   name: "players",
//   initialState,
//   reducers: {
//     endTurn: (state) => {
//       state.playCount + 1 >= 4 ? state.playCount = 0 : state.playCount++;
//       // state.playCount = (state.playCount + 1) % 3 === 0 ? state.playCount + 1 : 0;
//       state.playing = state.turnOrder[state.playCount];

//     }
//   },
//   extraReducers: (builder) => {
//     builder.addCase(setPlayer, (state, action) => {
//       const { location, playerColor } = action.payload;
//       console.log({ state, action });
//       state[playerColor].location = location;
//     })
//   }

// })

// export const { endTurn } = playerSlice.actions;

// export const selectPlayers = (state: RootState) => state.players;
// export default playerSlice.reducer;


export default PSlice;
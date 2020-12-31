export { }
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState, store } from "../../app/store";
// // import { setPlayerLocation } from "../player/playerSlice";
// // import { Player } from "../player/types";
// import { GameState, Tile } from "./types";
// import { initialTileMap, initTileQueue, bag, TileData } from "./seedData";


// const initialState: GameState = {
//   bag: bag,
//   board: initialTileMap,
//   queue: initTileQueue,
//   selected: null
// }

// export const gameSlice = createSlice({
//   name: "tiles",
//   initialState,
//   reducers: {
//     drawTile: (state) => {
//       const i = Math.floor(Math.random() * state.bag.length);
//       const tileToMove = state.bag.splice(i, 1);
//       state.queue.push(tileToMove[0]);
//     },
//     setTile: (state, action: PayloadAction<{ location: number, tile: Tile }>) => {
//       state.board[action.payload.location] = action.payload.tile;
//     },
//     setTileFromQueue: (state, action: PayloadAction<number>) => {
//       if (state.selected !== null) {
//         const tile = state.selected;
//         const i = state.queue.findIndex(x => x.id === tile.id);
//         if (i >= 0) {
//           state.queue.splice(i, 1);
//           state.selected = null;
//           state.board[action.payload] = { ...tile, location: action.payload };
//         }
//       }
//     },
//     selectTile: (state, action: PayloadAction<Tile>) => {
//       if (state.selected) {
//         if (state.selected.id === action.payload.id) {
//           state.selected = null;
//         }
//       } else {
//         state.selected = action.payload;
//         return;
//       }
//     },
//     setPlayer: (state, action: PayloadAction<{ location: number, playerColor: string }>) => {
//       const { location, playerColor } = action.payload;
//       // setPlayerLocation({ location: location, options: state.board[location].directions });
//       // const copyPlayer = { ...player, location: location }
//       // player.location = location;
//       // copyPlayer.options = state.board[location].directions;
//       state.board[location].player = playerColor;
//     },
//   },
//   // extraReducers: (builder) => {
//   //   builder.addCase(setPlayerLocation, (state, action) => {
//   //     console.log({ state, action });
//   //   })
//   // }
// })

// export const { drawTile, setTile, setTileFromQueue, selectTile, setPlayer } = gameSlice.actions;
// export const selectTiles = (state: RootState) => state.tiles;
// export default gameSlice.reducer;
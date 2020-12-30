import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { GameState, Tile, Player, Direction } from "./types";
import { initialTileMap, bag, initTileQueue } from "./tiles/seedData";


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


const initialState: GameState = {
  bag: bag,
  board: initialTileMap,
  queue: initTileQueue,
  selected: null,
  players: {
    turnOrder: {
      0: "red",
      1: "blue",
      2: "green",
      3: "yellow"
    },
    red: PlayerR,
    green: PlayerG,
    blue: PlayerB,
    yellow: PlayerY,
    playCount: 0,
    playing: "red",
  }
}

export const gameSlice = createSlice({
  name: "tiles",
  initialState,
  reducers: {
    drawTile: (state) => {
      const i = Math.floor(Math.random() * state.bag.length);
      const tileToMove = state.bag.splice(i, 1);
      state.queue.push(tileToMove[0]);
    },
    setTile: (state, action: PayloadAction<{ location: number, tile: Tile }>) => {
      state.board[action.payload.location] = action.payload.tile;
    },
    setTileFromQueue: (state, action: PayloadAction<number>) => {
      if (state.selected !== null) {
        const tile = state.selected;
        const i = state.queue.findIndex(x => x.id === tile.id);
        if (i >= 0) {
          state.queue.splice(i, 1);
          state.selected = null;
          state.board[action.payload] = { ...tile, location: action.payload };
        }
      }
    },
    selectTile: (state, action: PayloadAction<Tile>) => {
      if (state.selected) {
        if (state.selected.id === action.payload.id) {
          state.selected = null;
        }
      } else {
        state.selected = action.payload;
        return;
      }
    },
    endTurn: (state) => {
      state.players.playCount + 1 >= 4 ? state.players.playCount = 0 : state.players.playCount++;
      state.players.playing = state.players.turnOrder[state.players.playCount];
    },
    setPlayer: (state, action: PayloadAction<{ location: number, playerColor: string }>) => {
      const { location, playerColor } = action.payload;
      state.players[playerColor].location = location;
      state.players[playerColor].options = state.board[location].directions;
      state.board[location].player = playerColor;
      // setPlayerLocation({ location: location, options: state.board[location].directions });
      // const copyPlayer = { ...player, location: location }
      // player.location = location;
      // copyPlayer.options = state.board[location].directions;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(setPlayerLocation, (state, action) => {
  //     console.log({ state, action });
  //   })
  // }
})

export const { drawTile, setTile, setTileFromQueue, selectTile, setPlayer, endTurn } = gameSlice.actions;
export const selectGame = (state: RootState) => state.game;
export default gameSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { GameState, Tile, Colors, Player, PlayerTile } from "./types";
import { initialTileMap, bag, initTileQueue, EmptyTileData } from "./tiles/seedData";

const RedTile: PlayerTile = {
  id: "red",
}

const PlayerR: Player = {
  tile: RedTile,
  color: "red",
  location: -1,
  options: [],
  isLit: true,
  nerveCount: 1,
}

const GreenTile: PlayerTile = {
  id: "green",
}

const PlayerG: Player = {
  tile: GreenTile,
  color: "green",
  location: -1,
  options: [],
  isLit: true,
  nerveCount: 1,
}
const PlayerB: Player = {
  tile: {
    id: "blue"
  },
  color: "blue",
  location: -1,
  options: [],
  isLit: true,
  nerveCount: 1,
}
const PlayerY: Player = {
  tile: {
    id: "yellow"
  },
  color: "yellow",
  location: -1,
  options: [],
  isLit: true,
  nerveCount: 1,
}

const initBoard2d: Tile[][] = [];

for (let i: number = 0; i < 6; i++) {
  initBoard2d[i] = [];
  for (let j: number = 0; j < 6; j++) {
    initBoard2d[i][j] = new EmptyTileData(i, j);
  }
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
  },
  board2d: initBoard2d,
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
    setTile: (state, action: PayloadAction<{ location: [number, number], tile: Tile }>) => {
      // state.board[action.payload.location] = action.payload.tile;
      const { location, tile } = action.payload;
      const [i, j] = location;
      state.board2d[i][j] = tile;
    },
    setTileFromQueue: (state, action: PayloadAction<[number, number]>) => {
      if (state.selected !== null) {
        const tile = state.selected;
        const idx = state.queue.findIndex(x => x.id === tile.id);
        if (idx >= 0) {
          state.queue.splice(idx, 1);
          state.selected = null;
          const [i, j] = action.payload;
          state.board2d[i][j] = { ...tile, location2d: action.payload };
        }
      }
    },
    selectTile: (state, action: PayloadAction<Tile>) => {
      // if (state.selectedPlayer !== null) {
      //   if (action.payload.location && state.selectedPlayer) {
      //     setPlayer({ location: action.payload.location, playerColor: state.selectedPlayer.id });
      //     // state.selectedPlayer = null;
      //   } else {
      //     state.selectedPlayer = null;
      //   }
      // }
      if (state.selected?.id === action.payload.id) {
        state.selected = null;
      } else {
        state.selected = action.payload;
        return;
      }
    },
    selectPlayerTile: (state, action: PayloadAction<Colors>) => {
      if (state.selected) {
        state.selected = null;
      }
      state.selectedPlayer = state.players[state.players.playing].tile;
    },
    endTurn: (state) => {
      state.players.playCount + 1 >= 4 ? state.players.playCount = 0 : state.players.playCount++;
      state.players.playing = state.players.turnOrder[state.players.playCount];
    },
    setPlayer: (state, action: PayloadAction<{ location: [number, number], playerColor: Colors }>) => {
      const { location, playerColor } = action.payload;
      // state.players[playerColor].location = location;
      const [i, j] = location;
      
      if (i < 0 || j < 0) {
        return;
      }

      state.players[playerColor].options = state.board2d[i][j].positionMap[state.board2d[i][j].currentPosition];
      state.board2d[i][j].player = playerColor;
      // setPlayerLocation({ location: location, options: state.board[location].directions });
      // const copyPlayer = { ...player, location: location }
      // player.location = location;
      // copyPlayer.options = state.board[location].directions;
    },
    rotateTile: (state, action: PayloadAction<[number, number]>) => {
      // const tile = state.board[action.payload];
      const [i, j] = action.payload;
      if (i < 0 || j < 0) {
        return;
      }
      const tile = state.board2d[i][j];
      if (tile) {
        tile.currentPosition + 90 >= 360 ? tile.currentPosition -= 270 : tile.currentPosition += 90;
        if (tile.player) {
          state.players[tile.player].options = tile.positionMap[tile.currentPosition];
        }
      }
    }
    // movePlayer: (state, action: PayloadAction<{}>) => { }
  }
})

export const {
  drawTile,
  setTile,
  setTileFromQueue,
  selectTile,
  setPlayer,
  endTurn,
  selectPlayerTile,
  rotateTile
} = gameSlice.actions;
export const selectGame = (state: RootState) => state.game;
export default gameSlice.reducer;
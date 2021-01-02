import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { GameState, Tile, Color, Player, Direction } from "./types";
import { bag, initTileQueue, EmptyTileData, Pit } from "./seedData";

const PlY: Player = {
  tile: {
    id: "yellow"
  },
  color: "yellow",
  location: [-1, -1],
  options: [],
  isLit: true,
  nerveCount: 1,
}
const PlR: Player = {
  tile: {
    id: "red"
  },
  color: "red",
  location: [-1, -1],
  options: [],
  isLit: true,
  nerveCount: 1,
}
const PlB: Player = {
  tile: {
    id: "blue"
  },
  color: "blue",
  location: [-1, -1],
  options: [],
  isLit: true,
  nerveCount: 1,
}
const PlG: Player = {
  tile: {
    id: "green"
  },
  color: "green",
  location: [-1, -1],
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
  board: initBoard2d,
  queue: initTileQueue,
  discard: [],
  selected: null,
  players: {
    turnOrder: {
      0: "red",
      1: "blue",
      2: "green",
      3: "yellow"
    },
    red: PlR,
    green: PlG,
    blue: PlB,
    yellow: PlY,
    playCount: 0,
    playing: "red",
  },
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
      const { location, tile } = action.payload;
      const [i, j] = location;
      state.board[i][j] = tile;
    },
    voidTile: (state, action: PayloadAction<[number, number]>) => {
      const [i, j] = action.payload;
      const tile = state.board[i][j];
      state.discard.push(tile);
      state.board[i][j] = new EmptyTileData(i, j);
    },
    setTileFromQueue: (state, action: PayloadAction<[number, number]>) => {
      if (state.selected !== null) {
        const tile = state.selected;
        const idx = state.queue.findIndex(x => x.id === tile.id);
        if (idx >= 0) {
          state.queue.splice(idx, 1);
          state.selected = null;
          const [i, j] = action.payload;
          state.board[i][j] = { ...tile, location: action.payload };
        }
      }
    },
    selectTile: (state, action: PayloadAction<Tile>) => {
      if (state.selected?.id === action.payload.id) {
        state.selected = null;
      } else {
        state.selected = action.payload;
        return;
      }
    },
    selectPlayerTile: (state, action: PayloadAction<Color>) => {
      if (state.selected) {
        state.selected = null;
      }
      state.selectedPlayer = state.players[state.players.playing].tile;
    },
    endTurn: (state) => {
      state.players.playCount + 1 >= 4 ? state.players.playCount = 0 : state.players.playCount++;
      state.players.playing = state.players.turnOrder[state.players.playCount];
    },
    setPlayer: (state, action: PayloadAction<[number, number]>) => {
      const [i, j] = action.payload;
      const tile = state.board[i][j];
      tile.active = true;~
      const player = state.players[state.players.playing];
      player.options = tile.positionMap[tile.currentPosition];
      player.location = tile.location;
    },
    rotateTile: (state, action: PayloadAction<[number, number]>) => {
      const [i, j] = action.payload;
      if (i < 0 || j < 0) {
        return;
      }
      const tile = state.board[i][j];
      const [iB, jB] = state.players.blue.location;
      const [iR, jR] = state.players.red.location;
      const [iY, jY] = state.players.yellow.location;
      const [iG, jG] = state.players.green.location;

      if (tile) {
        tile.currentPosition + 90 >= 360 ? tile.currentPosition -= 270 : tile.currentPosition += 90;
        if (iB === i && jB === j) { state.players.blue.options = tile.positionMap[tile.currentPosition] }
        if (iR === i && jR === j) { state.players.red.options = tile.positionMap[tile.currentPosition] }
        if (iY === i && jY === j) { state.players.yellow.options = tile.positionMap[tile.currentPosition] }
        if (iG === i && jG === j) { state.players.green.options = tile.positionMap[tile.currentPosition] }

      }
    },
    movePlayer: (state, action: PayloadAction<Direction>) => {
      const dir = action.payload;
      const player = state.players[state.players.playing];
      if (player.options.includes(dir)) {
        const [i, j] = player.location;
        const tile = state.board[i][j];
        if (tile.active && tile.turnsToPit) {
          state.board[i][j] = new Pit([i, j]);
        }
        let ni = i, nj = j;
        switch (dir) {
          case "up":
            ni = i - 1 < 0 ? 5 : i - 1;
            break;
          case "right":
            nj = j + 1 > 5 ? 0 : j + 1;
            break;
          case "down":
            ni = i + 1 > 5 ? 0 : i + 1;
            break;
          case "left":
            nj = j - 1 < 0 ? 5 : j - 1;
            break;
          default:
            break;
        }
        if (ni >= 0 && nj >= 0) {
          player.location = [ni, nj];

          const newTile = state.board[ni][nj];
          newTile.player = player.color;
          newTile.active = true;
          player.options = newTile.positionMap[newTile.currentPosition];
        }

      }
    }
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
  rotateTile,
  movePlayer,
  voidTile,
} = gameSlice.actions;
export const selectGame = (state: RootState) => state.game;
export default gameSlice.reducer;
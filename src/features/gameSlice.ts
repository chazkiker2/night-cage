import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Tile, Color, Direction } from "./types";
import { EmptyTileData, Pit, initialState } from "./seedData";

type SurroundingIdx = {
  [key: string]: [number, number];
  up: [number, number],
  right: [number, number],
  down: [number, number],
  left: [number, number]
}
const getSurroundingIdx = (i: number, j: number): SurroundingIdx => {
  const iDown = i + 1 > 5 ? 0 : i + 1;
  const iUp = i - 1 < 0 ? 5 : i - 1;
  const jLeft = j - 1 < 0 ? 5 : j - 1;
  const jRight = j + 1 > 5 ? 0 : j + 1;

  return {
    up: [iUp, j],
    right: [i, jRight],
    down: [iDown, j],
    left: [i, jLeft]
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

    /**
     * Allows users to set their player on a tile. (used for starting positions only)
     * @param state the state to update
     * @param action PayloadAction<[number, number]> signifying the location to set the tile
     */
    setPlayer: (state, action: PayloadAction<[number, number]>) => {
      const [i, j] = action.payload;
      const tile = state.board[i][j];
      tile.active = true;
      const player = state.players[state.players.playing];

      // if player is already on board, remove the illumination surrounding them.
      if (player.location[0] >= 0) {
        const [oi, oj] = player.location;
        const oIdx = getSurroundingIdx(oi, oj);
        Object.keys(oIdx).forEach(key => {
          const [xi, xj] = oIdx[key];
          const filteredIlluminated = state.board[xi][xj].illuminated.filter(x => x !== player.color);
          if (filteredIlluminated.length <= 0) {
            state.discard.push(state.board[xi][xj]);
            state.board[xi][xj].illuminated = [];
          } else {
            state.board[xi][xj].illuminated.splice(
              state.board[xi][xj].illuminated.findIndex(x => x === player.color), 1);
          }
        });
      }

      player.options = tile.positionMap[tile.currentPosition];
      player.location = tile.location;

      // add illumination around new position
      const surIdx = getSurroundingIdx(i, j);
      Object.keys(surIdx).forEach(key => {
        const [ki, kj] = surIdx[key];
        state.board[ki][kj] = { ...state.board[ki][kj], illuminated: [...state.board[ki][kj].illuminated, player.color] };
      });
    },

    /**
     * allows users to rotate a tile at the given location
     * @param state the state to change
     * @param action PayloadAction<[number, number]>
     */
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

    /**
     * Allows users to move their Prisoner Token in an available direction
     * @param state the state to manipulate
     * @param action the direction to move (PayloadAction<Direction>). 
     */
    movePlayer: (state, action: PayloadAction<Direction>) => {
      const dir = action.payload;
      const player = state.players[state.players.playing];
      if (player.options.includes(dir)) {
        const [i, j] = player.location;
        const tile = state.board[i][j];
        if (tile.active && tile.turnsToPit) {
          state.board[i][j] = new Pit([i, j]);
        }
        const initSurIdx = getSurroundingIdx(i, j);
        Object.keys(initSurIdx).forEach(key => {
          const [xi, xj] = initSurIdx[key];
          if (key !== dir) {
            const filteredIlluminated = state.board[xi][xj].illuminated.filter(x => x !== player.color);
            if (filteredIlluminated.length <= 0) {
              state.discard.push(state.board[xi][xj]);
              state.board[xi][xj] = new EmptyTileData(xi, xj);
              state.board[xi][xj].illuminated = [];
            } else {
              state.board[xi][xj].illuminated.splice(
                state.board[xi][xj].illuminated.findIndex(x => x === player.color), 1);
            }
          }
        });
        let [ni, nj] = initSurIdx[action.payload];
        player.location = [ni, nj];
        const secSurIdx = getSurroundingIdx(ni, nj);
        Object.keys(secSurIdx).forEach(key => {
          const [xi, xj] = secSurIdx[key];
          state.board[xi][xj] = { ...state.board[xi][xj], illuminated: [...state.board[xi][xj].illuminated, player.color] }
        });
        state.board[ni][nj].player = player.color;
        state.board[ni][nj].active = true;
        player.options = state.board[ni][nj].positionMap[state.board[ni][nj].currentPosition];
      }
    },
    stayPlayer: (state) => {
      const player = state.players[state.players.playing];
      if (player.options.includes("stay")) {
        const [i, j] = player.location;
        const tile = state.board[i][j];
        if (tile.active && tile.turnsToPit) {
          const pit = new Pit([i, j]);
          pit.active = true;
          pit.player = player.color;
          state.board[i][j] = pit;
        }
        if (player.nerveCount < 2) {
          player.nerveCount++;
        }
        const rand = Math.floor(Math.random() * state.bag.length);
        const tileToMove = state.bag.splice(rand, 1);
        state.queue.push(tileToMove[0]);
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
  stayPlayer,
} = gameSlice.actions;
export const selectGame = (state: RootState) => state.game;
export default gameSlice.reducer;
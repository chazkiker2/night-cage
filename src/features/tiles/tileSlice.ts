import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { StartTile, Tile } from "./";
import PassageT from "./PassageT";
import WaxEater from "./WaxEater";
interface RemainingTiles {
  startTile: number;
  keyTile: number;
  waxEater: number;
  gate: number;
  passageT: number;
  passageStraight: number;
  passageFourWay: number;
}

interface TileMap {
  [key: number]: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  13: string;
  14: string;
  15: string;
  16: string;
  17: string;
  18: string;
  19: string;
  20: string;
  21: string;
  22: string;
  23: string;
  24: string;
  25: string;
  26: string;
  27: string;
  28: string;
  29: string;
  30: string;
  31: string;
  32: string;
  33: string;
  34: string;
  35: string;
}

interface TileState {
  remainingTiles: RemainingTiles;
  // tileMap: Map<number, string>;
  tileMap: TileMap;
  queue: Array<string>;
}

const initialTileMap: TileMap = {
  0: "empty",
  1: "empty",
  2: "empty",
  3: "empty",
  4: "empty",
  5: "empty",
  6: "empty",
  7: "empty",
  8: "empty",
  9: "empty",
  10: "empty",
  11: "empty",
  12: "empty",
  13: "empty",
  14: "empty",
  15: "empty",
  16: "empty",
  17: "empty",
  18: "empty",
  19: "empty",
  20: "empty",
  21: "empty",
  22: "empty",
  23: "empty",
  24: "empty",
  25: "empty",
  26: "empty",
  27: "empty",
  28: "empty",
  29: "empty",
  30: "empty",
  31: "empty",
  32: "empty",
  33: "empty",
  34: "empty",
  35: "empty",
}

const initialState: TileState = {
  remainingTiles: {
    startTile: 0,
    keyTile: 6,
    waxEater: 12,
    gate: 4,
    passageStraight: 10,
    passageT: 32,
    passageFourWay: 12
  },
  tileMap: initialTileMap,
  queue: Array<string>("start", "start", "start", "start"),
}

export const tileSlice = createSlice({
  name: "tiles",
  initialState,
  reducers: {
    drawTiles: (state, action: PayloadAction<number>) => {
      for (let i = 0; i < action.payload; i++) {
        if (state.remainingTiles.waxEater > 0) {
          state.remainingTiles.waxEater--;
          state.queue.push("WaxEater");
        } else {
          state.remainingTiles.passageT--;
          state.queue.push("PassageT");
        }
      }
    },
    setTile: (state, action: PayloadAction<{ key: number, tileName: string }>) => {
      state.tileMap[action.payload.key] = action.payload.tileName;
    }
  }
})

export const { drawTiles, setTile } = tileSlice.actions;
export const selectTiles = (state: RootState) => state.tiles;
export default tileSlice.reducer;
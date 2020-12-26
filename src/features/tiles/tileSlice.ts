import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
// import { StartTile, Tile, PassageT, WaxEater } from "./";
// import PassageT from "./PassageT";
// import WaxEater from "./WaxEater";


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


interface RemainingTiles {
  startTile: number;
  keyTile: number;
  waxEater: number;
  gate: number;
  passageT: number;
  passageStraight: number;
  passageFourWay: number;
}

// directions: "up" | "right" | "left" | "down";
// interface TileData {
//   [key: string]: any;
//   name: string;
//   directions: string;
//   willBePit: boolean;
//   location?: number;
//   hostMultiple?: boolean;
// }

class TileData {
  name: string;
  directions: string;
  turnsToPit: boolean;
  willBePit: boolean;
  active: boolean;
  location: number | undefined;
  // hostMultiple: boolean | undefined;

  constructor(
    name: string,
    directions: string,
    turnsToPit: boolean,
    willBePit: boolean,
    active: boolean,
    location: number | undefined
  ) {
    this.name = name;
    this.directions = directions;
    this.turnsToPit = turnsToPit;
    this.willBePit = willBePit;
    this.active = active;
    this.location = location ?? undefined;
  }
}
class StartTileData extends TileData {
  constructor() {
    super(
      "start",
      "down right",
      true,
      true,
      true,
      undefined
    )
  }
}
class KeyTileData extends TileData {
  constructor() {
    super(
      "key",
      "down right left up",
      true,
      false,
      false,
      undefined
    )
  }
}

class WaxEaterData extends TileData {
  constructor() {
    super(
      "wax",
      "up down left right",
      false,
      false,
      false,
      undefined
    );
  }
}

class GateData extends TileData {
  hostMultiplePlayers = true;
  constructor() {
    super(
      "gate",
      "up down left right",
      false,
      false,
      false,
      undefined
    )
  }
}
class StraightPassageData extends TileData {
  constructor() {
    super(
      "straight",
      "up down",
      true,
      false,
      false,
      undefined
    )
  }
}
class PassageTData extends TileData {
  constructor() {
    super(
      "t",
      "up down left",
      false,
      false,
      false,
      undefined
    )
  }
}

class PassageFourWay extends TileData {
  constructor() {
    super(
      "four",
      "up down left right",
      false,
      false,
      false,
      undefined
    )
  }
}

const bag = new Array<TileData>();

for (let i = 0; i < 6; i++) {
  bag.push(new KeyTileData());
}
for (let i = 0; i < 12; i++) {
  bag.push(new WaxEaterData());
}
for (let i = 0; i < 4; i++) {
  bag.push(new GateData());
}
for (let i = 0; i < 10; i++) {
  bag.push(new StraightPassageData());
}
for (let i = 0; i < 32; i++) {
  bag.push(new PassageTData());
}
for (let i = 0; i < 12; i++) {
  bag.push(new PassageFourWay());
}

interface TileState {
  remainingTiles: RemainingTiles;
  tileBag: Array<TileData>;
  // tileMap: Map<number, string>;
  tileMap: TileMap;
  queue: Array<string>;
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
  tileBag: bag,
  tileMap: initialTileMap,
  queue: Array<string>("start", "start", "start", "start"),

}

export const tileSlice = createSlice({
  name: "tiles",
  initialState,
  reducers: {
    drawTile: (state) => {
      const i = Math.floor(Math.random() * state.tileBag.length);
      const tileToMove = state.tileBag.splice(i, 1);
      state.queue.push(tileToMove[0]?.name);
    },
    setTile: (state, action: PayloadAction<{ key: number, tileName: string }>) => {
      state.tileMap[action.payload.key] = action.payload.tileName;
    }
  }
})

export const { drawTile, setTile } = tileSlice.actions;
export const selectTiles = (state: RootState) => state.tiles;
export default tileSlice.reducer;
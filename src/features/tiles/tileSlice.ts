import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { v4 as uuid } from "uuid";

// import { StartTile, Tile, PassageT, WaxEater } from "./";
// import PassageT from "./PassageT";
// import WaxEater from "./WaxEater";



interface TileMap {
  [key: number]: TileData;
  0: TileData;
  1: TileData;
  2: TileData;
  3: TileData;
  4: TileData;
  5: TileData;
  6: TileData;
  7: TileData;
  8: TileData;
  9: TileData;
  10: TileData;
  11: TileData;
  12: TileData;
  13: TileData;
  14: TileData;
  15: TileData;
  16: TileData;
  17: TileData;
  18: TileData;
  19: TileData;
  20: TileData;
  21: TileData;
  22: TileData;
  23: TileData;
  24: TileData;
  25: TileData;
  26: TileData;
  27: TileData;
  28: TileData;
  29: TileData;
  30: TileData;
  31: TileData;
  32: TileData;
  33: TileData;
  34: TileData;
  35: TileData;
}

class TileData {
  static nextId: number = 1;
  id: number;
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
    // this.id = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    this.id = TileData.nextId;
    TileData.nextId++;
    this.name = name;
    this.directions = directions;
    this.turnsToPit = turnsToPit;
    this.willBePit = willBePit;
    this.active = active;
    this.location = location ?? undefined;
  }
}

class EmptyTileData extends TileData {
  constructor() {
    super(
      "empty",
      "",
      false,
      false,
      false,
      undefined
    )
  }
}

const initialTileMap: TileMap = {
  0: new EmptyTileData(),
  1: new EmptyTileData(),
  2: new EmptyTileData(),
  3: new EmptyTileData(),
  4: new EmptyTileData(),
  5: new EmptyTileData(),
  6: new EmptyTileData(),
  7: new EmptyTileData(),
  8: new EmptyTileData(),
  9: new EmptyTileData(),
  10: new EmptyTileData(),
  11: new EmptyTileData(),
  12: new EmptyTileData(),
  13: new EmptyTileData(),
  14: new EmptyTileData(),
  15: new EmptyTileData(),
  16: new EmptyTileData(),
  17: new EmptyTileData(),
  18: new EmptyTileData(),
  19: new EmptyTileData(),
  20: new EmptyTileData(),
  21: new EmptyTileData(),
  22: new EmptyTileData(),
  23: new EmptyTileData(),
  24: new EmptyTileData(),
  25: new EmptyTileData(),
  26: new EmptyTileData(),
  27: new EmptyTileData(),
  28: new EmptyTileData(),
  29: new EmptyTileData(),
  30: new EmptyTileData(),
  31: new EmptyTileData(),
  32: new EmptyTileData(),
  33: new EmptyTileData(),
  34: new EmptyTileData(),
  35: new EmptyTileData(),
}


// interface RemainingTiles {
//   startTile: number;
//   keyTile: number;
//   waxEater: number;
//   gate: number;
//   passageT: number;
//   passageStraight: number;
//   passageFourWay: number;
// }

// directions: "up" | "right" | "left" | "down";
// interface TileData {
//   [key: string]: any;
//   name: string;
//   directions: string;
//   willBePit: boolean;
//   location?: number;
//   hostMultiple?: boolean;
// }


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

// for (let i = 0; i < 36; i++) {
//   initialTileMap[i] = new EmptyTileData();
// }

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

const initTileQueue = new Array<TileData>();
for (let i = 0; i < 4; i++) {
  initTileQueue.push(new StartTileData());
}

interface TileState {
  // remainingTiles: RemainingTiles;
  tileBag: Array<TileData>;
  // tileMap: Map<number, string>;
  tileQueue: Array<TileData>;
  tileMap: TileMap;
  selectedTile: TileData | undefined;
  // queue: Array<string>;
}


const initialState: TileState = {
  tileBag: bag,
  tileMap: initialTileMap,
  tileQueue: initTileQueue,
  selectedTile: undefined
}

export const tileSlice = createSlice({
  name: "tiles",
  initialState,
  reducers: {
    drawTile: (state) => {
      const i = Math.floor(Math.random() * state.tileBag.length);
      const tileToMove = state.tileBag.splice(i, 1);
      state.tileQueue.push(tileToMove[0]);
    },
    setTile: (state, action: PayloadAction<{ location: number, tile: TileData }>) => {
      state.tileMap[action.payload.location] = action.payload.tile;
    },
    setTileFromQueue: (state, action: PayloadAction<number>) => {
      if (state.selectedTile !== undefined) {
        const tile = state.selectedTile;
        const i = state.tileQueue.findIndex(x => x.id === tile.id);
        if (i >= 0) {
          state.tileQueue.splice(i, 1);
          state.selectedTile = undefined;
          state.tileMap[action.payload] = tile;
        }
      }
    },
    selectTile: (state, action: PayloadAction<TileData>) => {
      if (state.selectedTile === undefined || state.selectedTile.id !== action.payload.id) {
        state.selectedTile = action.payload;
        return;
      }
      if (state.selectedTile.id === action.payload.id) {
        state.selectedTile = undefined;
      }
    }
  }
})

export const { drawTile, setTile, setTileFromQueue, selectTile } = tileSlice.actions;
export const selectTiles = (state: RootState) => state.tiles;
export default tileSlice.reducer;
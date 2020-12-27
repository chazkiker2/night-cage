import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface TileMap {
  [key: number]: TileData;
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

// initialize tile queue
const initTileQueue = new Array<TileData>();

for (let i = 0; i < 4; i++) {
  initTileQueue.push(new StartTileData());
}

// initialize tile bag
const bag = new Array<TileData>();

for (let i = 0; i < 6; i++) {
  bag.push(new KeyTileData());
}
for (let i = 0; i < 12; i++) {
  bag.push(new WaxEaterData());
}
for (let i = 0; i < 12; i++) {
  bag.push(new PassageFourWay());
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

// initialize tile map
const initialTileMap: TileMap = {}

for (let i = 0; i < 36; i++) {
  initialTileMap[i] = new EmptyTileData();
}

interface TileState {
  bag: Array<TileData>;
  queue: Array<TileData>;
  board: TileMap;
  selected: TileData | undefined;
}


const initialState: TileState = {
  bag: bag,
  board: initialTileMap,
  queue: initTileQueue,
  selected: undefined
}

export const tileSlice = createSlice({
  name: "tiles",
  initialState,
  reducers: {
    drawTile: (state) => {
      const i = Math.floor(Math.random() * state.bag.length);
      const tileToMove = state.bag.splice(i, 1);
      state.queue.push(tileToMove[0]);
    },
    setTile: (state, action: PayloadAction<{ location: number, tile: TileData }>) => {
      state.board[action.payload.location] = action.payload.tile;
    },
    setTileFromQueue: (state, action: PayloadAction<number>) => {
      if (state.selected !== undefined) {
        const tile = state.selected;
        const i = state.queue.findIndex(x => x.id === tile.id);
        if (i >= 0) {
          state.queue.splice(i, 1);
          state.selected = undefined;
          state.board[action.payload] = { ...tile, location: action.payload };
        }
      }
    },
    selectTile: (state, action: PayloadAction<TileData>) => {
      if (state.selected === undefined || state.selected.id !== action.payload.id) {
        state.selected = action.payload;
        return;
      }
      if (state.selected.id === action.payload.id) {
        state.selected = undefined;
      }
    }
  }
})

export const { drawTile, setTile, setTileFromQueue, selectTile } = tileSlice.actions;
export const selectTiles = (state: RootState) => state.tiles;
export default tileSlice.reducer;
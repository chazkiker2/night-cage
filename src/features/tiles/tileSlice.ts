import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../../app/store";
// import { setPlayerLocation } from "../player/playerSlice";
import { Player } from "../player/types";
import { TileMap, Tile, Direction } from "./types";

class TileData implements Tile {
  static nextId: number = 1;
  id: number;
  name: string;
  directions: Direction[];
  turnsToPit: boolean;
  willBePit: boolean;
  active: boolean;
  location: number | undefined;
  player: string | null;
  // hostMultiple: boolean | undefined;

  constructor(
    name: string,
    directions?: Direction[],
    turnsToPit?: boolean,
    willBePit?: boolean,
    active?: boolean,
    location?: number,
    player?: string
  ) {
    // this.id = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    this.id = TileData.nextId;
    TileData.nextId++;
    this.name = name;
    this.directions = directions ?? [];
    this.turnsToPit = turnsToPit ?? false;
    this.willBePit = willBePit ?? false;
    this.active = active ?? false;
    this.location = location ?? undefined;
    this.player = player ?? null;
  }

  // setPlayer(p: Player) {
  //   this.player = p;
  // }
  // getPlayer(p: Player) {
  //   return this.player;
  // }
}

class EmptyTileData extends TileData {
  constructor() {
    super(
      "empty"
    )
  }
}



class StartTileData extends TileData {
  constructor() {
    super(
      "start",
      ["up", "right"],
      true,
      true,
      true
    )
  }
}

class KeyTileData extends TileData {
  constructor() {
    super(
      "key",
      ["down", "right", "left", "up"],
      true,
      false,
      false,
    )
  }
}

class WaxEaterData extends TileData {
  constructor() {
    super(
      "wax",
      ["up", "down", "left", "right"],
      false,
      false,
      false
    );
  }
}

class GateData extends TileData {
  hostMultiplePlayers = true;
  constructor() {
    super(
      "gate",
      ["up", "down", "left", "right"],
      false,
      false,
      false,
    )
  }
}
class StraightPassageData extends TileData {
  constructor() {
    super(
      "straight",
      ["up", "down"],
      true,
      false,
      false,
    )
  }
}
class PassageTData extends TileData {
  constructor() {
    super(
      "t",
      ["up", "down", "left"],
      false,
      false,
      false,
    )
  }
}

class PassageFourWay extends TileData {
  constructor() {
    super(
      "four",
      ["up", "down", "left", "right"],
      false,
      false,
      false,
    )
  }
}

// initialize tile queue
const initTileQueue = new Array<TileData>();
initTileQueue.push(new StartTileData());


// initialize tile bag
const bag = new Array<TileData>();

for (let i = 0; i < 3; i++) {
  // initTileQueue.push(new EmptyTileData());
  bag.push(new StartTileData());
}

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
  // initialTileMap[i] = null;
}

interface TileState {
  bag: Array<Tile>;
  queue: Array<Tile>;
  board: TileMap;
  selected: Tile | null;
}


const initialState: TileState = {
  bag: bag,
  board: initialTileMap,
  queue: initTileQueue,
  selected: null
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
    selectTile: (state, action: PayloadAction<TileData>) => {
      if (state.selected) {
        if (state.selected.id === action.payload.id) {
          state.selected = null;
        }
      } else {
        state.selected = action.payload;
        return;
      }
    },
    setPlayer: (state, action: PayloadAction<{ location: number, playerColor: string }>) => {
      const { location, playerColor } = action.payload;
      // setPlayerLocation({ location: location, options: state.board[location].directions });
      // const copyPlayer = { ...player, location: location }
      // player.location = location;
      // copyPlayer.options = state.board[location].directions;
      state.board[location].player = playerColor;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(setPlayerLocation, (state, action) => {
  //     console.log({ state, action });
  //   })
  // }
})

export const { drawTile, setTile, setTileFromQueue, selectTile, setPlayer } = tileSlice.actions;
export const selectTiles = (state: RootState) => state.tiles;
export default tileSlice.reducer;
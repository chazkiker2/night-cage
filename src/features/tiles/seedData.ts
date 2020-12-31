import { TileMap, Tile, PositionMap, Colors } from "../types";

class TileData implements Tile {
  static nextId: number = 1;
  id: number;
  name: string;
  // directions: Direction[];
  turnsToPit: boolean;
  willBePit: boolean;
  active: boolean;
  location: number | undefined;
  player: Colors | null;
  positionMap: PositionMap;
  currentPosition: 0 | 90 | 180 | 270;
  location2d: [number, number];
  // hostMultiple: boolean | undefined;

  constructor(
    name: string,
    positionMap: PositionMap,
    turnsToPit?: boolean,
    willBePit?: boolean,
    active?: boolean,
    location2d?: [number, number],
    location?: number,
    player?: Colors | null,
  ) {
    this.id = TileData.nextId;
    TileData.nextId++;
    this.name = name;
    this.positionMap = positionMap ?? {
      0: [],
      90: [],
      180: [],
      270: []
    };
    // this.directions = directions ?? [];
    this.turnsToPit = turnsToPit ?? false;
    this.willBePit = willBePit ?? false;
    this.active = active ?? false;
    this.location = location ?? undefined;
    this.player = player ?? null;
    this.currentPosition = 0;
    this.location2d = location2d ?? [-1, -1];
  }
}

const empty: PositionMap = {
  0: [],
  90: [],
  180: [],
  270: []
}

export class EmptyTileData extends TileData {
  constructor(i: number, j: number) {
    super(
      "empty",
      empty,
      false,
      false,
      false,
      [i, j]
    )
  }
}



const startTilePosition: PositionMap = {
  0: ["up", "right"],
  90: ["right", "down"],
  180: ["down", "left"],
  270: ["left", "up"]
}

class StartTileData extends TileData {
  constructor() {
    super(
      "start",
      startTilePosition,
      true,
      true,
      true,
    )
  }
}

const allDirectionPosition: PositionMap = {
  0: ["up", "right", "down", "left"],
  90: ["right", "down", "left", "up"],
  180: ["down", "left", "up", "right"],
  270: ["left", "up", "right", "down"]
}
class KeyTileData extends TileData {
  constructor() {
    super(
      "key",
      allDirectionPosition,
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
      allDirectionPosition,
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
      allDirectionPosition,
      false,
      false,
      false,
    )
  }
}

const straightPosition: PositionMap = {
  0: ["up", "down"],
  90: ["right", "left"],
  180: ["down", "up"],
  270: ["left", "right"]
}
class StraightPassageData extends TileData {
  constructor() {
    super(
      "straight",
      straightPosition,
      true,
      false,
      false,
    )
  }
}

const tPosition: PositionMap = {
  0: ["up", "right", "down"],
  90: ["right", "down", "left"],
  180: ["down", "left", "up"],
  270: ["left", "up", "right"]
}
class PassageTData extends TileData {
  constructor() {
    super(
      "t",
      tPosition,
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
      allDirectionPosition,
      false,
      false,
      false,
    )
  }
}

// initialize tile queue
const initTileQueue = new Array<TileData>();


// initialize tile bag
const bag = new Array<TileData>();

for (let i = 0; i < 4; i++) {
  initTileQueue.push(new StartTileData());
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

// for (let i = 0; i < 36; i++) {
//   initialTileMap[i] = new EmptyTileData();
//   // initialTileMap[i] = null;
// }

export { initialTileMap, initTileQueue, bag, TileData };
// export { initTileQueue };
// export { bag };
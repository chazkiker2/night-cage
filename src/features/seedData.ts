import { TileMap, Tile, PositionMap, Color, Player, GameState, } from "./types";

class TileData implements Tile {
  static nextId: number = 1;
  id: number;
  name: string;
  turnsToPit: boolean;
  illuminated: Color[];
  active: boolean;
  player: Color | null;
  positionMap: PositionMap;
  currentPosition: 0 | 90 | 180 | 270;
  location: [number, number];

  constructor(
    name: string,
    positionMap: PositionMap,
    turnsToPit?: boolean,
    location?: [number, number],
    player?: Color | null,
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
    this.illuminated = [];
    this.turnsToPit = turnsToPit ?? false;
    this.active = false;
    this.player = player ?? null;
    this.currentPosition = 0;
    this.location = location ?? [-1, -1];
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
      [i, j]
    )
  }
}



const startTilePosition: PositionMap = {
  0: ["up", "right", "stay"],
  90: ["right", "down", "stay"],
  180: ["down", "left", "stay"],
  270: ["left", "up", "stay"],
}

class StartTileData extends TileData {
  constructor() {
    super(
      "start",
      startTilePosition,
      true,
    )
  }
}

const allDirectionPosition: PositionMap = {
  0: ["up", "right", "down", "left", "stay"],
  90: ["right", "down", "left", "up", "stay"],
  180: ["down", "left", "up", "right", "stay"],
  270: ["left", "up", "right", "down", "stay"],
}
class KeyTileData extends TileData {
  constructor() {
    super(
      "key",
      allDirectionPosition,
      true,
    )
  }
}

class WaxEaterData extends TileData {
  constructor() {
    super(
      "wax",
      allDirectionPosition,
      false,
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
    )
  }
}

const straightPosition: PositionMap = {
  0: ["left", "right"],
  90: ["up", "down"],
  180: ["right", "left"],
  270: ["down", "up"],
}
class StraightPassageData extends TileData {
  constructor() {
    super(
      "straight",
      straightPosition,
      true,
    )
  }
}

const tPosition: PositionMap = {
  0: ["left", "up", "right", "stay"],
  90: ["up", "right", "down", "stay"],
  180: ["right", "down", "left", "stay"],
  270: ["down", "left", "up", "stay"],
}
class PassageTData extends TileData {
  constructor() {
    super(
      "t",
      tPosition,
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
    )
  }
}

export class Pit extends TileData {
  constructor(location: [number, number]) {
    super(
      "pit",
      allDirectionPosition,
      false,
      location
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

const PlY: Player = {
  tile: {
    id: "yellow"
  },
  color: "yellow",
  location: [-1, -1],
  options: [],
  hasKey: false,
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
  hasKey: false,
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
  hasKey: false,
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
  hasKey: false,
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


export { initialTileMap, initTileQueue, bag, TileData, initialState, initBoard2d, PlG, PlB, PlY, PlR };
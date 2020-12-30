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

for (let i = 0; i < 36; i++) {
  initialTileMap[i] = new EmptyTileData();
  // initialTileMap[i] = null;
}

export { initialTileMap, initTileQueue, bag, TileData };
// export { initTileQueue };
// export { bag };
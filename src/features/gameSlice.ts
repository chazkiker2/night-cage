import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { GameState, Tile, Color, Player, Direction, PlayersState } from "./types";
import { bag, initTileQueue, EmptyTileData, Pit } from "./seedData";

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

// const checkLighting = (players: PlayersState, board: Tile[][], loc: [number, number]) => {
//   const [i, j] = loc;
//   const [ri, rj] = players.red.location;
//   const [gi, gj] = players.green.location;
//   const [yi, yj] = players.yellow.location;
//   const [bi, bj] = players.blue.location;


// }

const checkLighting = (location: [number, number], oldBoard: Tile[][]): Tile[][] => {
  const [i, j] = location;
  // const tile = board[i][j];
  const iDown = i + 1 > 5 ? 0 : i + 1;
  const iUp = i - 1 < 0 ? 5 : i - 1;
  const jLeft = j - 1 < 0 ? 5 : j - 1;
  const jRight = j + 1 > 5 ? 0 : j + 1;
  const board = { ...oldBoard };
  const tile = board[i][j];
  if (tile.player) {
    const tileUp = board[iUp][j]
    if (tileUp.name !== "empty") {
      tileUp.illuminated.push(tile.player);
    }
    const tileDown = board[iDown][j];
    if (tileDown.name !== "empty") {
      tileDown.illuminated.push(tile.player);
    }
    const tileRight = board[i][jRight];
    if (tileRight.name !== "empty") {
      tileRight.illuminated.push(tile.player);
    }
    const tileLeft = board[i][jLeft];
    if (tileLeft.name !== "empty") {
      tileLeft.illuminated.push(tile.player);
    }
  }

  return board;

}

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
    setPlayer: (state, action: PayloadAction<[number, number]>) => {
      const [i, j] = action.payload;
      const tile = state.board[i][j];
      tile.active = true;
      const player = state.players[state.players.playing];
      player.options = tile.positionMap[tile.currentPosition];
      player.location = tile.location;
      const surroundingIdx = getSurroundingIdx(i, j);
      const [ui, uj] = surroundingIdx.up;
      const tileUp = state.board[ui][uj];
      const [ri, rj] = surroundingIdx.right;
      const tileRight = state.board[ri][rj];
      const [di, dj] = surroundingIdx.down;
      const tileDown = state.board[di][dj];
      const [li, lj] = surroundingIdx.left;
      const tileLeft = state.board[li][lj];
      if (tileUp.name !== "empty") {
        tileUp.illuminated.push(player.color);
      }
      if (tileDown.name !== "empty") {
        tileDown.illuminated.push(player.color);
      }
      if (tileRight.name !== "empty") {
        tileRight.illuminated.push(player.color);
      }
      if (tileLeft.name !== "empty") {
        tileLeft.illuminated.push(player.color);
      }
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
      try {


        const dir = action.payload;
        const player = state.players[state.players.playing];
        if (player.options.includes(dir)) {
          const [i, j] = player.location;
          const tile = state.board[i][j];
          if (tile.active && tile.turnsToPit) {
            state.board[i][j] = new Pit([i, j]);
          }
          const initSurIdx = getSurroundingIdx(i, j);

          const [ui, uj] = initSurIdx.up;
          state.board[ui][uj].illuminated.splice(
            state.board[ui][uj].illuminated.findIndex(x => x === player.color), 1);

          const [di, dj] = initSurIdx.down;
          state.board[di][dj].illuminated.splice(
            state.board[di][dj].illuminated.findIndex(x => x === player.color), 1);

          const [li, lj] = initSurIdx.left;
          state.board[li][lj].illuminated.splice(
            state.board[li][lj].illuminated.findIndex(x => x === player.color), 1);

          const [ri, rj] = initSurIdx.right;
          state.board[ri][rj].illuminated.splice(
            state.board[ri][rj].illuminated.findIndex(x => x === player.color), 1);

          // Object.keys(initSurIdx).forEach(key => {
          //   const [xi, xj] = initSurIdx[key];
          //   state.board[xi][xj].illuminated = state.board[xi][xj].illuminated.filter(x => x !== player.color);
          //   console.log(state.board[xi][xj]);
          //   // state.board[xi][xj].illuminated.splice(
          //   //   state.board[xi][xj].illuminated.findIndex(x => x === player.color), 1);
          // });


          let [ni, nj] = initSurIdx[dir];

          if (ni >= 0 && nj >= 0) {
            player.location = [ni, nj];
            const secSurIdx = getSurroundingIdx(ni, nj);

            state.board[ni][nj].player = player.color;
            state.board[ni][nj].active = true;

            const [ui2, uj2] = secSurIdx.up;
            // state.board[ui2][uj2].illuminated = state.board[ui2][uj2].illuminated.splice(0, 0, player.color);

            const [di2, dj2] = secSurIdx.down;
            // state.board[di2][dj2].illuminated.splice(0, 0, player.color);

            const [li2, lj2] = secSurIdx.left;
            // state.board[li2][lj2].illuminated.splice(0, 0, player.color);

            const [ri2, rj2] = secSurIdx.right;
            // state.board[ri2][rj2].illuminated.splice(0, 0, player.color);

            // Object.keys(secSurIdx).forEach(key => {
            //   const [xi, xj] = secSurIdx[key];
            //   // state.board[xi][xj].illuminated = state.board[xi][xj].illuminated.concat(player.color);
            //   console.log(state.board[xi][xj]);
            // });


            player.options = state.board[ni][nj].positionMap[state.board[ni][nj].currentPosition];
          }


        }
      }
      catch (err) {
        console.log(err);
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
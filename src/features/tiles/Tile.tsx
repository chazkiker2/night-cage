import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTile,
  selectGame,
  setPlayer,
  setTileFromQueue,
  rotateTile,
  voidTile
} from "../gameSlice";
import {
  Gate,
  KeyTile,
  PassageFourWay,
  PassageStraight,
  PassageT,
  Pit,
  StartTile,
  WaxEater
} from "./";
import { Candle } from "../player";
import { Color } from "../types";

type Props = {
  children?: React.ReactNode;
  containing?: string;
  tile: any;
  loc: [number, number];
}

type CProps = {
  children?: React.ReactNode;
  containing: string;
  loc?: [number, number];
  tile?: any;
}

type SProps = {
  rotation: number;
  hover?: boolean;
  selected?: boolean;
  start?: boolean;
  editing?: boolean;
}


const Tile: React.FC<Props> = ({ children, loc, containing = "empty", tile }) => {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();
  // const [rotation, setRotation] = useState(0);
  const rotation = tile.currentPosition;
  const [candle, setCandle] = useState<Color | null>(null);
  // const tiles = game;
  const players = game.players;
  const { red, green, blue, yellow } = players;
  const rLoc = red.location;
  const gLoc = green.location;
  const bLoc = blue.location;
  const yLoc = yellow.location;


  useEffect(() => {
    const [rR, rC] = rLoc;
    const [bR, bC] = bLoc;
    const [yR, yC] = yLoc;
    const [gR, gC] = gLoc;
    const [r, c] = loc;

    if (rR === r && rC === c) {
      setCandle("red");
    } else if (gR === r && gC === c) {
      setCandle("green");
    } else if (yR === r && yC === c) {
      setCandle("yellow");
    } else if (bR === r && bC === c) {
      setCandle("blue");
    } else {
      setCandle(null);
    }

  }, [rLoc, gLoc, bLoc, yLoc, loc]);


  const rotate = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    dispatch(rotateTile(loc));
  }

  const select: React.MouseEventHandler = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    dispatch(selectTile(tile))
  }

  const handleSetTile = () => {
    dispatch(setTileFromQueue(loc));
  }

  const handleSetPlayer = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    dispatch(setPlayer(loc));
  }

  const handleVoidTile = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    dispatch(voidTile(loc))
  }


  if (containing === "empty") {
    return (<TileSlot onClick={handleSetTile} />);
  } else {
    return (
      <TileSlot>
        <TileContainer
          onClick={select}
          rotation={rotation}
          selected={game.selected?.id === tile.id}
        >
          <TileUtils
            rotation={rotation}
            start={containing === "start"}
          >
            <span className="util" id="select" onClick={rotate} />
            <span className="util" id="setPlayer" onClick={handleSetPlayer} />
            <span className="util" id="voidTile" onClick={handleVoidTile} />

            {
              candle && <Candle color={candle} />
            }
          </TileUtils>

          <ContainedTile containing={containing} tile={tile} />
        </TileContainer>
      </TileSlot>
    )
  }
}

const ContainedTile: React.FC<CProps> = ({ children, containing = "empty" }) => {
  switch (containing) {
    case "empty":
      return (null);
    case "gate":
      return (<Gate />);
    case "key":
      return <KeyTile />
    case "four":
      return <PassageFourWay />
    case "straight":
      return <PassageStraight />
    case "t":
      return <PassageT />
    case "pit":
      return (<Pit />);
    case "start":
      return (<StartTile />);
    case "wax":
      return (<WaxEater />);
    default:
      return (null);
  }
}


const TileSlot = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.pDarkest};
	border: 1px solid white;
	height: 100%; 
	width: 100%;
  position: relative;
`;

const TileUtils = styled.div<SProps>`
  height: 100%;
	width: 100%;
  position: absolute;
  z-index: 4;
  transform: ${({ rotation }) => `rotate(-${rotation}deg)`};
  transition: transform 0.2s ease-in-out;
  .util {
    position: absolute;
    cursor: pointer;
    display: inline-block;
    width: 15px;
    height: 15px;
    z-index: 4;
  }
  #select {
    top: 5px;
    left: 5px;
    background-color: yellow;
  }
  #setPlayer {
    display: ${({ start }) => start ? "inline-block" : "none"};
    left: 5px;
    bottom: 5px;
    background-color: blue;
  }
  #voidTile {
    top: 5px;
    right: 5px;
    background-color: red;
  }
`;

const TileContainer = styled.div<SProps>`
	height: 100%;
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	border: 1px solid ${({ selected }) => selected ? "blue" : "white"};
	background: var(--pDarker);
	transform: ${({ rotation }) => `rotate(${rotation}deg)`};
	transition: transform 0.2s ease-in-out;
  position: relative;
`;

export default Tile;
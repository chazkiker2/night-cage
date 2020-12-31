import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTile,
  selectGame,
  setPlayer,
  setTileFromQueue,
  rotateTile
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
}


const Tile: React.FC<Props> = ({ children, loc, containing = "empty", tile }) => {
  const game = useSelector(selectGame);
  // const tiles = game;
  const players = game.players;

  const dispatch = useDispatch();
  const [rotation, setRotation] = useState(0);

  const rotate = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setRotation(rotation + 90 >= 360 ? rotation - 270 : rotation + 90);
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
    // console.log({ location: loc, playerColor: players.playing });
    console.log(loc);
    dispatch(setPlayer(loc));
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
          <span id="select" onClick={rotate} />
          <span id="setPlayer" onClick={handleSetPlayer} />
          {/* <Candle color={"yellow"} /> */}
          {/* <Candle color={undefined} /> */}
          {players.red.location === loc ? <Candle color={"red"} /> : null}
          {players.green.location === loc ? <Candle color={"green"} /> : null}
          {players.yellow.location === loc ? <Candle color={"yellow"} /> : null}
          {players.blue.location === loc ? <Candle color={"blue"} /> : null}

          {/* <Candle color={tile.player} /> */}
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
  #select {
    position: absolute;
    cursor: pointer;
    display: inline-block;
    top: 5px;
    left: 5px;
    width: 15px;
    height: 15px;
    background-color: yellow;
    z-index: 4;
  }
  #setPlayer {
    position: absolute;
    cursor: pointer;
    display: inline-block;
    top: 5px;
    right: 5px;
    width: 15px;
    height: 15px;
    background-color: blue;
    z-index: 4;
  }
`;

export default Tile;
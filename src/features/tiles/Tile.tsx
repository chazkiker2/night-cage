import React, { useState } from "react";
import styled from "styled-components";
import { selectTile, selectTiles, setTileFromQueue } from "./tileSlice";
import {
  Bag,
  Gate,
  KeyTile,
  PassageFourWay,
  PassageStraight,
  PassageT,
  Pit,
  StartTile,
  WaxEater
} from "./";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  children?: React.ReactNode;
  containing?: string;
  tile: any;
  loc: number;
}

type CProps = {
  children?: React.ReactNode;
  containing: string;
  loc?: number | string;
  tile?: any;
}

type SProps = {
  rotation: number;
  hover?: boolean;
  selected?: boolean;
}

// const selectChild = (containing: string): React.ReactNode => {
//   switch (containing) {
//     case "gate": return Gate;
//     case "key": return KeyTile;
//     case "four": return PassageFourWay;
//     case "straight": return PassageStraight;
//     case "t": return PassageT;
//     case "pit": return Pit;
//     default: return StartTile;
//   }
// }

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

const Tile: React.FC<Props> = ({ children, loc, containing = "empty", tile }) => {
  const tiles = useSelector(selectTiles);
  const dispatch = useDispatch();
  const [rotation, setRotation] = useState(0);

  const rotate = () => {
    setRotation(rotation + 90 >= 360 ? rotation - 270 : rotation + 90);
  }

  const select: React.MouseEventHandler = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    dispatch(selectTile(tile))
  }

  const handleSetTile = () => {
    dispatch(setTileFromQueue(loc));

  }

  if (containing === "empty") {
    return (<TileSlot onClick={handleSetTile} />);
  } else {
    return (
      <TileSlot>
        <TileContainer
          onClick={rotate}
          rotation={rotation}
          // onMouseEnter={handleHoverIn}
          // onMouseOut={handleHoverOut}
          // hover={hover}
          selected={tiles.selectedTile?.id === tile.id}
        >
          <span id="select" onClick={select}>X</span>
          <ContainedTile containing={containing} tile={tile} />
        </TileContainer>
      </TileSlot>
    )
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
    /* display: ${({ hover }) => hover ? "inline-block" : "none"}; */
    display: inline-block;
    top: 5px;
    left: 5px;
    width: 15px;
    height: 15px;
    background-color: yellow;
    z-index: 9;
  }
`;

export default Tile;
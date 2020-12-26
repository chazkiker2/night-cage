import React, { useState } from "react";
import styled from "styled-components";
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

type Props = {
  children?: React.ReactNode;
  containing?: string;
}

type SProps = {
  rotation: number;
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

const ContainedTile: React.FC<Props> = ({ children, containing = "empty" }) => {
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

const Tile: React.FC<Props> = ({ children, containing = "empty" }) => {
  const [rotation, setRotation] = useState(0);
  const rotate = () => {
    setRotation(rotation + 90 >= 360 ? rotation - 270 : rotation + 90);
  }

  if (containing === "empty") {
    return (<TileSlot />);
  } else {
    return (
      <TileSlot>
        <TileContainer onClick={rotate} rotation={rotation}>
          <ContainedTile containing={containing} />
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
`;

const TileContainer = styled.div<SProps>`
	height: 100%;
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	border: 1px solid white;
	background: var(--pDarker);
	transform: ${({ rotation }) => `rotate(${rotation}deg)`};
	transition: transform 0.2s ease-in-out;
`;

export default Tile;
import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  children?: React.ReactNode
}

type SProps = {
  rotation: number;
}

const Tile: React.FC<Props> = ({ children }) => {
  const [rotation, setRotation] = useState(0);
  const rotate = () => {
    setRotation(rotation + 90 >= 360 ? rotation - 270 : rotation + 90);
  }
  return (
    <TileSlot>
      {
        children
          ? (
            <TileContainer onClick={rotate} rotation={rotation}>
              {children}
            </TileContainer>
          )
          : null
      }
    </TileSlot>
  )
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
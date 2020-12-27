import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { selectTiles, setTile } from "../tiles/tileSlice";

import {
  Tile,
  Bag,
  Gate,
  KeyTile,
  PassageFourWay,
  PassageStraight,
  PassageT,
  Pit,
  StartTile,
  tileSlice,
  WaxEater
} from "../tiles/";

type Props = {
  children?: React.ReactNode,
  context?: any
}

// const initState: any = [
//   Gate,
//   KeyTile,
//   PassageFourWay,
//   PassageStraight,
//   PassageT,
//   StartTile,
// ]

// const options = []

const ClassicBoard: React.FC<Props> = (props) => {
  const tiles = useSelector(selectTiles);
  const dispatch = useDispatch();

  // const randomGen = (evt: React.MouseEvent) => {
  //   evt.preventDefault();

  //   const num = Math.floor(Math.random() * 36);
  //   const

  // }


  return (
    <Page>
      <SixBySixCage>
        {
          Object.entries(tiles.tileMap).map(([k, v]) => {
            return <Tile key={k} loc={Number.parseInt(k)} tile={v} containing={v.name} />
          })
        }

      </SixBySixCage>
    </Page>

  )
}

// const DryBoard: React.FC<Props> = (props) => {
//   return (
//     <SixBySixCage>
//       {/* ROW 1 */}
//       <Tile containing="gate" />
//       <Tile containing="pit" />
//       <Tile />
//       <Tile />
//       <Tile />
//       <Tile />
//       {/* ROW 2 */}
//       <Tile />
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       {/* ROW 3 */}
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       {/* ROW 4 */}
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       {/* ROW 5 */}
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       {/* ROW 6 */}
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//       <Tile></Tile>
//     </SixBySixCage>
//   )
// }


const Page = styled.div`
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	/* overflow-x: auto; */
	overflow: hidden;
`;

const SixBySixCage = styled.div`
	width: 96vw;
	max-width: 900px;
	max-height: 900px;
	justify-content: center;
	display: grid;
  grid-template-columns: repeat(6, minmax(16%, 1fr));
  grid-auto-rows: 1fr;
	&::before {
          content: '';
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
	}
	& > *:first-child {
    grid-row: 1 / 1;
		grid-column: 1 / 1;
	}
	justify-items: center;
	align-items: center;
	gap: 0;
`;

export default ClassicBoard;
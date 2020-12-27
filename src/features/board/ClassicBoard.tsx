import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectTiles } from "../tiles/tileSlice";
import { Tile } from "../tiles/";

type Props = {
  children?: React.ReactNode,
  context?: any
}

const ClassicBoard: React.FC<Props> = (props) => {
  const tiles = useSelector(selectTiles);

  return (
    <Page>
      <SixBySixCage>
        {
          Object.entries(tiles.board).map(([k, v]) => {
            return <Tile key={k} loc={Number.parseInt(k)} tile={v} containing={v.name} />
          })
        }
      </SixBySixCage>
    </Page>
  )
}

const Page = styled.div`
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
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
import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Tile } from "../";
import { selectTiles, drawTile } from "../gameSlice";

type Props = {
  children?: React.ReactNode
}

const Queue: React.FC<Props> = (props) => {
  const tiles = useSelector(selectTiles);
  const dispatch = useDispatch();

  const pullTile = () => {
    dispatch(drawTile());
  }

  return (
    <Styled>
      <QContainer>
        <StQueue>
          {
            tiles.queue.map((x, i) => {
              return <Tile key={i} loc={-1} tile={x} containing={x.name} />
            })
          }
        </StQueue>
      </QContainer>
      <StBag onClick={pullTile}>
        <h1>Bag</h1>
      </StBag>
    </Styled>

    // </SplitPane>
  );
}

const Styled = styled.div`
  width: 60%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  border: 10px solid var(--pDarkest);
  border-radius: 20px;
`;

const QContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 500px;
  /* width: 100%; */
  max-width: 600px;
  height: 100%;
  /* background-color: var(--pDarker); */
`;

const StQueue = styled.div`
  width: 100%;
  max-width: 900px;
  max-height: 160px;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(4, minMax(16%, 1fr));
  grid-auto-rows: 1fr;
  &::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1/1;
    grid-column: 1/1;
  }
  & > *:first-child {
		grid-row: 1 / 1;
		grid-column: 1 / 1;
	}
	justify-items: center;
	align-items: center;
	gap: 0;
`;

const StBag = styled.div`
  height: 100px;
  width: 100px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--pDarkest);
  h1 {
    font-size: 3rem;
  }
  border-radius: 50%;
  cursor: pointer;
`;

export default Queue;
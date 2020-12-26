import React from "react";
import styled from "styled-components";
import Bag from "../Bag";
import Tile from "../Tile";

type Props = {
  children?: React.ReactNode
}

const Queue: React.FC<Props> = (props) => {
  return (
    <SplitPane>
      <div className="left">
        <QContainer>
          <StQueue>
            <Tile>

            </Tile>
            <Tile>

            </Tile>
            <Tile>

            </Tile>
            <Tile>

            </Tile>
          </StQueue>
        </QContainer>
      </div>

      <div className="right">
        <Bag />
      </div>

    </SplitPane>
  );
}

const SplitPane = styled.div`
  width: 100%;
  /* width: 96vw; */
  /* max-width: 900px; */
  height: 300px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  .left {
    width: 70%;
  }
  .right {
    width: 20%;
  }
`;

const QContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* margin: 2rem auto; */
  width: 100%;
  height: 100%;
`;

const StQueue = styled.div`
  width: 100%;
  /* height: 100%; */
  /* width: 96vw; */
  max-width: 900px;
  max-height: 160px;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(6, minMax(16%, 1fr));
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

export default Queue;
import React from "react";
import styled from "styled-components";
import Queue from "../tiles/queue/Queue";
import ClassicBoard from "./ClassicBoard";
// import Header from "../../shared/Header";
import { CandleQueue, TurnTracker } from "../player";

const PlayHome = (props: any) => {
  return (
    <>
      <BoardContainer>
        <CandleQueue />
        <Queue />
        <TurnTracker />
        <ClassicBoard />
      </BoardContainer>
    </>
  );
}

const BoardContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: space-evenly;
`;

export default PlayHome;
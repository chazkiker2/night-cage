import React from "react";
import styled from "styled-components";
import Queue from "../tiles/queue/Queue";
import ClassicBoard from "./ClassicBoard";
import { TurnTracker, PrisonerStatus } from "../player";

const PlayHome = (props: any) => {
  return (
    <>
      <BoardContainer>
        <ToolBar>
          <Queue />
          <TurnTracker />
        </ToolBar>
        <ClassicBoard />
        <PrisonerStatus color="red" shown={true} />
      </BoardContainer>
    </>
  );
}

const ToolBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const BoardContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: space-evenly;
`;

export default PlayHome;
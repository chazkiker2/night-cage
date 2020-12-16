import React from "react";
import styled from "styled-components";
import ClassicBoard from "./ClassicBoard";
// import Header from "../../shared/Header";

const PlayHome = (props: any) => {
  return (
    <>
      <BoardContainer>
        <ClassicBoard />
      </BoardContainer>
    </>
  );
}

const BoardContainer = styled.div`
	width: 100vw;
	height: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
`;

export default PlayHome;
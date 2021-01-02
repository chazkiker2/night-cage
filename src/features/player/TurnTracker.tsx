import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectGame, endTurn } from "../gameSlice";
import { Heading, Anchor } from "../../shared/layout";
// import { PrisonerStatus } from "./";

type Props = {}

const TurnTracker: React.FC<Props> = (props) => {
  // const [showInst, setShowInst] = useState(false);
  const game = useSelector(selectGame);
  const players = game.players;
  const dispatch = useDispatch();

  return (
    <>
      <STracker>
        <Heading h4>Turn: {players.playing}</Heading>
        <Anchor onClick={() => dispatch(endTurn())} bgColor={players.playing}>End Turn</Anchor>
      </STracker>

      {/* <StContainer>
        <Anchor onClick={() => setShowInst(!showInst)}>Toggle</Anchor>
      <Dropdown shown={showInst}>
        <PrisonerStatus shown={showInst} />

      </Dropdown>
    </StContainer> */}
    </>
  )
}
const STracker = styled.div`
  width: 500px;
  background-color: var(--pDarker);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

// type DropProps = {
//   shown: boolean;
// }
// const Dropdown = styled.div<DropProps>`
//   display: ${({ shown }) => shown ? "block" : "none"};
// `;


// const StContainer = styled.div`
//   display: flex;
//   flex-flow: column nowrap;
//   justify-content: center;
//   align-items: center;
// `;

// const CandleContainer = styled.div`
//   display: flex;
//   margin: 1px auto;
//   height: 100%;
//   width: 84px;
//   flex-flow: row nowrap;
//   justify-content: center;
//   align-items: center;
//   position: static;
// `;

export default TurnTracker;
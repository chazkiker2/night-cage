import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectPlayers, endTurn } from "./playerSlice";
import { Heading, Anchor } from "../../shared/layout";
type Props = {}

const TurnTracker: React.FC<Props> = (props) => {
  const players = useSelector(selectPlayers);
  const dispatch = useDispatch();

  return (
    <STracker>
      <Heading h4>Turn: {players.playing}</Heading>
      <Anchor onClick={() => dispatch(endTurn())}>End Turn</Anchor>
    </STracker>
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

export default TurnTracker;
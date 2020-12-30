import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectGame, endTurn } from "../gameSlice";
import { Heading, Anchor } from "../../shared/layout";
type Props = {}

const TurnTracker: React.FC<Props> = (props) => {
  const game = useSelector(selectGame);
  const players = game.players;
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
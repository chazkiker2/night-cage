import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { listenPostFall, postFall, selectGame, stayPlayer } from "../gameSlice";
import styled from "styled-components";
import { Color } from "../types";
import { Candle } from "./";
import { Heading, Anchor } from "../../shared/layout";

type Props = {
  children?: React.ReactNode;
  color?: Color;
  shown: boolean;
}

const Instructions: React.FC<Props> = ({ shown }) => {

  const game = useSelector(selectGame);
  const player = game.players[game.players.playing];


  if (player.isLit) {
    return (
      <StWrap shown={shown}>

        <StInstructions>
          <div className="left">
            <Heading h4>Lights on</Heading>
            <div className="title-instructions">
              <Heading h5>Move one space</Heading>
              <p>Or</p>
              <Heading h5>Stay</Heading>
              <p>Discard a tile & gain one nerve</p>
            </div>
          </div>

          <div className="right">
            <Heading h5>You may spend 1 Nerve to...</Heading>
            <ul>
              <li>Move Again</li>
              <li>Block: When a monster attack would discard exactly 3 tiles, only discard 2 instead.</li>
              <li>Charge: Move onto & then through a Monster tile, taking all penalities from the attack, but scrambling to a tile beyond it as it becomes a Pit.</li>
              <li>Sustain: During FINAL FLICKERS, ignore removing an illuminated tile after your turn. A Prisoner cannot spend a Nerve to Sustain if they gained a Nerve this turn.</li>
            </ul>
            <p>2 NERVE IS A MAXIMUM. YOU MAY STAY, BUT YOU WILL NOT GAIN MORE THAN 2.</p>
          </div>
        </StInstructions>

      </StWrap>
    )
  }


  return (
    <StWrap shown={shown}>
      {
        player.isLit ? <h1>Lights on</h1> : <h1>Lights out</h1>
      }
    </StWrap>
  );
}

const PrisonerStatus: React.FC<Props> = ({ color, shown }) => {
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const player = game.players[game.players.playing];

  const handleStay = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    dispatch(stayPlayer());
  }

  const handlePostFall = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    dispatch(listenPostFall())
  }

  return (
    <StWrap shown={shown}>
      <CandleContainer>
        <Candle color={player.color} utils={false} />
      </CandleContainer>
      <Heading h5>Candle status: {player.isLit ? "Lit" : "lights out"}</Heading>
      <Heading h5>Nerve Count: {player.nerveCount}</Heading>
      <Heading h5>Has Key: {player.hasKey ? "true" : "false"}</Heading>
      <Heading h5>Options:
        {
          player.options.map(x => {
            return ` ${x},`;
          })
        }
      </Heading>
      <Heading h5>Location: [{player.location[0]}, {player.location[1]}]</Heading>
      <Anchor onClick={handleStay}>Stay</Anchor>
      <Anchor onClick={handlePostFall}>{game.postFall ? "Listening" : "Listen"}</Anchor>
      <Instructions shown={shown} />

    </StWrap>
  );
}
// const ContainerContainer = styled.div`

// `;
const CandleContainer = styled.div`
  display: flex;
  height: 150px;
  width: 150px;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StInstructions = styled.div`
  padding: 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  div {
    width: 50%;
  }
`;

type StWrapProps = {
  shown: boolean;
  children?: React.ReactNode,
}

const StWrap = styled.div<StWrapProps>`
  margin: 2rem;
  /* width: 600px; */
  display: ${({ shown }) => shown ? "flex" : "none"};
  flex-flow: column nowrap;
  background-color: var(--pDarker);
  position: relative;
`;

export default PrisonerStatus;
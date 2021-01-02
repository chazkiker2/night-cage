import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { movePlayer, selectGame } from "../gameSlice";
import { Color, Direction } from "../types";

type CandleProps = {
  children?: React.ReactNode;
  color: Color;
  utils?: boolean;
}

type SCandleProps = CandleProps & {
  lit: boolean;
}

type CandleUtilProps = {
  display: boolean;
}

const Candle: React.FC<CandleProps> = ({ color, utils = true }) => {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();
  const player = game.players[color];
  const isLit = player.isLit;

  const handleMove = (evt: React.MouseEvent, dir: Direction) => {
    evt.stopPropagation();
    // const target = evt.target;
    // console.log(target.); 
    dispatch(movePlayer(dir));
  }


  if (!color) {
    return null;
  }
  return (
    <>
      <SCandle
        lit={isLit}
        color={color}
      >
        <CandleUtils display={utils}>
          <DirectionArrow
            avail={player.options.includes("up")}
            color={color}
            id="up"
            onClick={(e: React.MouseEvent) => handleMove(e, "up")}
          />
          <DirectionArrow
            avail={player.options.includes("right")}
            color={color}
            id="right"
            onClick={(e: React.MouseEvent) => handleMove(e, "right")}
          />
          <DirectionArrow
            avail={player.options.includes("down")}
            color={color}
            id="down"
            onClick={(e: React.MouseEvent) => handleMove(e, "down")}
          />
          <DirectionArrow
            avail={player.options.includes("left")}
            color={color}
            id="left"
            onClick={(e: React.MouseEvent) => handleMove(e, "left")}
          />
        </CandleUtils>
        <span id="flame" />
        <span id="stick" />
        <span id="base" />
      </SCandle>
    </>
  )
}

type DirectionProps = {
  avail: boolean;
  className?: string;
  id?: string;
  color: Color;
  onClick: (e: React.MouseEvent) => void;
}

const DirectionArrow = styled.div<DirectionProps>`
  position: absolute;
  cursor: pointer;
  display: inline-block;
  /* display: ${({ avail }) => avail ? "inline-block" : "none"}; */
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: ${({ avail }) => avail ? `16px solid #FFF` : "none"};
  z-index: 4;
`;

const CandleUtils = styled.div<CandleUtilProps>`
  height: 100%;
  width: 100%;
  display: ${({ display }) => display ? "flex" : "none"};
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  .move {
    position: absolute;
    cursor: pointer;
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    /* border-bottom: 14px solid var(--white); */
    z-index: 4;
  }
  #up {
    top: 0px;
  }
  #right {
    transform: rotate(90deg);
    right: 0px;
  }
  #down {
    transform: rotate(180deg);
    bottom: 0px;
  }
  #left {
    transform: rotate(270deg);
    left: 0px;
  }
`

const SCandle = styled.div<SCandleProps>`
  background-color: rgba(0,0,0,0.4);
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 32px;
  z-index: 4;
  text-align: center;
  border-radius: 10px;
  border: 2px solid ${({ color }) => color};


  #flame {
    /* display: block; */
    /* display: ${({ lit }) => lit ? "inline-block" : "hidden"}; */
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 80% 0 55% 50% / 55% 0 80% 50%;
    transform: rotate(-45deg);
    background-color: ${({ color, lit }) => lit ? color : "transparent"};
    border: 1px solid ${({ lit, color }) => lit ? "transparent" : color};
  }
  #stick {
    margin: 2px;
    display: block;
    width: 15px;
    height: 40px;
    background-color: ${({ color }) => color};
  }
  #base {
    display: block;
    width: 40px;
    height: 4px;
    background-color: ${({ color }) => color};
  }
`;

export default Candle;
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { movePlayer } from "../gameSlice";
import { Direction } from "../types";

type Props = {
  children?: React.ReactNode;
  color?: "red" | "blue" | "green" | "yellow";
}

const Candle: React.FC<Props> = ({ color }) => {
  const dispatch = useDispatch();

  const handleMove = (evt: React.MouseEvent, dir: Direction) => {
    evt.stopPropagation();
    dispatch(movePlayer(dir));
  }

  if (!color) {
    return null;
  }
  return (
    <>
      <SCandle
        color={color}
      >
        <span className="move" id="up" onClick={(e) => handleMove(e, "up")} />
        <span className="move" id="right" onClick={(e) => handleMove(e, "right")} />
        <span className="move" id="down" onClick={(e) => handleMove(e, "down")} />
        <span className="move" id="left" onClick={(e) => handleMove(e, "left")} />
        <span id="flame" />
        <span id="stick" />
        <span id="base" />
      </SCandle>
    </>
  )
}

const SCandle = styled.div<Props>`
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
  .move {
    position: absolute;
    cursor: pointer;
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 14px solid var(--white);
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

  #flame {
    display: block;
    width: 15px;
    height: 15px;
    border-radius: 80% 0 55% 50% / 55% 0 80% 50%;
    transform: rotate(-45deg);
    background-color: ${({ color }) => color};
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
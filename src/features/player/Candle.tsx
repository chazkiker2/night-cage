import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectPlayers } from "./playerSlice";
import { setPlayer } from "../tiles/tileSlice";

type Props = {
  children?: React.ReactNode;
  color?: "red" | "blue" | "green" | "yellow";
}

const Candle: React.FC<Props> = ({ color }) => {
  const player = useSelector(selectPlayers);
  const dispatch = useDispatch();

  const testSlice = () => {
    dispatch(setPlayer({ player: player.yellow, location: 0 }));
  }

  if (!color) {
    return null;
  }
  return (
    <SCandle color={color} onClick={testSlice}>
      <span id="flame" />
      <span id="stick" />
      <span id="base" />
    </SCandle>
  )
}

const SCandle = styled.div<Props>`
  background-color: rgba(0,0,0,0.4);
  /* background-color: rgba(255,255,255,0.1); */
  padding: 4px;
  /* background-color: black; */
  /* opacity: 0.2; */
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  top: 30px;
  left: 50px;
  z-index: 4;
  text-align: center;
  border-radius: 10px;
  border: 2px solid ${({ color }) => color};
  #flame {
    display: block;
    width: 15px;
    height: 15px;
    /* border-radius: 50%; */
    /* border-radius: 0 50% 50% 50%; */
    border-radius: 80% 0 55% 50% / 55% 0 80% 50%;
    transform: rotate(-45deg);
    background-color: ${({ color }) => color};
  }
  #stick {
    margin: 2px;
    display: block;
    width: 15px;
    height: 50px;
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
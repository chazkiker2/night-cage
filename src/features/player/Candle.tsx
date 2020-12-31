import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerTile, selectGame } from "../gameSlice";


type Props = {
  children?: React.ReactNode;
  color?: "red" | "blue" | "green" | "yellow";
}

const Candle: React.FC<Props> = ({ color }) => {
  const game = useSelector(selectGame);
  // const { selectedPlayer } = game;
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  // const testSlice = () => {
  //   dispatch(setPlayer({ player: player.yellow, location: 0 }));
  // }
  const handleSelectCandle = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    if (color !== undefined) {
      dispatch(selectPlayerTile(color))
    }
  }

  // useEffect(() => {
  //   if (selectedPlayer === color && inputEl) {
  //     // @ts-ignore
  //     inputEl && inputEl.current && inputEl.current.focus();
  //   }
  // }, [selectedPlayer, color])

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (evt: React.KeyboardEvent) => {
    // code:"ArrowUp"
    // "ArrowDown"
    // "ArrowRight"
    // "ArrowLeft"
    evt.stopPropagation();
    console.log(evt);
  }


  if (!color) {
    return null;
  }
  return (
    <SCandle
      color={color}
      onClick={handleSelectCandle}
      onKeyDown={handleKeyPress}
    >
      <input type="text" value="" onKeyDown={handleKeyPress} ref={inputEl} />
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
  input {
    display: none;
  }
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
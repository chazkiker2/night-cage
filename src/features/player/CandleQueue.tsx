import React from "react";
import styled from "styled-components";
import { Candle } from "./";

type Props = {
  children?: React.ReactNode
}

const CandleQueue: React.FC<Props> = props => {
  return (
    <SQueue>
      <CandleContainer>
        <Candle color={"red"} />
      </CandleContainer>
      <CandleContainer>
        <Candle color={"green"} />
      </CandleContainer>
      <CandleContainer>
        <Candle color={"blue"} />
      </CandleContainer>
      <CandleContainer>
        <Candle color={"yellow"} />
      </CandleContainer>
    </SQueue>
  )
}

const CandleContainer = styled.div`
  height: 100%;
  position: relative;
  top: -22px;
  left: -50px;
`;

const SQueue = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--pDarker);
  height: 100px;
  width: 300px;
  position: relative;
`;


export default CandleQueue;
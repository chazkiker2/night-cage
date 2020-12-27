import React from "react";
import styled from "styled-components";


type Props = {
  children?: React.ReactNode
}

const Pit: React.FC<Props> = ({ children }) => {
  return (
    <StPit>
      <Circle>
        <h1>PIT</h1>
      </Circle>
    </StPit>
  )
}

const Circle = styled.div`
	width: 70%; height: 70%;
	position: absolute;
	z-index: 1;
	border-radius: 50%;
	border: 1.5rem solid var(--pBase);
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	h1 {
		color: white;
		background-color: none;
		background: none;
		font-size: 4rem;
		position: relative;
	}
`;

const StPit = styled.div`
	width: 100%; height: 100%;
	overflow: hidden;
	text-align: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

export default Pit;
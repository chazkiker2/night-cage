import React from "react";
import styled from "styled-components";

type Props = {
  children?: React.ReactNode
}

const PassageStraight: React.FC<Props> = ({ children }) => {
  return (
    <SPassageGrid>
      <span className="one" />
      <span className="two" />
    </SPassageGrid>
  )
}

const SPassageGrid = styled.div`
	height: 100%; width: 100%;
	display: grid;
	overflow: hidden;
	background-color: gray;
	gap: 4%;
	grid-template:
		[row1-start] "one" 48% [row1-end]
		[row2-start] "two" 48% [row2-end] / auto;
	span {
		background-color: var(--pDark);
	}
	.one {
		grid-area: one;
	}
	.two {
		grid-area: two;
	}
`;

export default PassageStraight;
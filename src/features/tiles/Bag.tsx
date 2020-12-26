import React from "react";
import styled from "styled-components";

type Props = {
  children?: React.ReactNode
}

const Bag: React.FC<Props> = (props) => {

  const handleClick: React.EventHandler<React.MouseEvent> = (event) => {
    event.preventDefault();
    console.log(event);
  }

  return (
    <StBag onClick={handleClick}>
      <h1>Bag</h1>
    </StBag>
  );
}

const StBag = styled.div`
	/* width: 50px; height: 50px; */
  height: 150px;
  width: 150px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--pDarkest);
  h1 {
    font-size: 4rem;
  }
  border-radius: 50%;
  cursor: pointer;
`;

// const Circle = styled.div`
// 	width: 50%; height: 50%;
// 	position: absolute;
// 	z-index: 1;
// 	background-color: white;
// 	transform: translate(50%, 50%);
// 	border-radius: 50%;
// 	border: 0px;
// 	display: flex;
// 	flex-flow: column nowrap;
// 	justify-content: center;
// 	align-items: center;
// 	z-index: 1;
// 	h1 {
// 		color: black;
// 		background-color: none;
// 		background: none;
// 		font-size: 4rem;
// 		position: relative;
// 	}
// `;

export default Bag;

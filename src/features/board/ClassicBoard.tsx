import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Tile,
  Bag,
  Gate,
  KeyTile,
  PassageFourWay,
  PassageStraight,
  PassageT,
  Pit,
  StartTile,
  tileSlice,
  WaxEater
} from "../tiles/";

type Props = {
  children?: React.ReactNode | React.PropsWithChildren<Props>,
  context?: any
}

// const initComponents = [
//   <Gate />, <KeyTile />, <PassageFourWay />, <PassageStraight />,
//   <PassageT />, <Pit />, <StartTile />, <WaxEater />
// ];

// const initState: Array<React.FC<any>> = [
//   (<Gate />),
//   (<KeyTile />),
//   (<PassageFourWay />),
//   (<PassageStraight />),
//   // (<PassageT />),
//   // (<Pit />),
//   (<StartTile />),
//   // (<WaxEater />)
// ];

const initState: any = [
  Gate,
  KeyTile,
  PassageFourWay,
  PassageStraight,
  PassageT,
  StartTile,
]

const ClassicBoard: any = (props: any) => {
  const [squares, setSquares] = useState<any>([]);

  useEffect((): void => {
    for (let i = 0; i < 36 - initState.length; i++) {
      setSquares((p: any[]) => p.concat(null));
    }
    for (let i = 0; i < initState.length; i++) {
      setSquares((p: any[]) => p.concat(initState[i]));
    }
    // setSquares([...squares, squares.concat(initState)]);
    // console.log(squares);
  }, []);

  return (
    <Page>
      {/* <div>
				<button onClick={() => addTile(0, (<StraightPassage />))}>Straight</button>
				<button onClick={() => addTile(1, (<TPassage />))}>T-Passage</button>
				<button onClick={() => addTile(2, (<FourPassage />))}>4-Way</button>
				<button onClick={() => addTile(3, (<Starting />))}>Start</button>
				<button onClick={() => addTile(4, (<Gate />))}>Gate</button>
				<button onClick={() => addTile(5, (<WaxEater />))}>WaxEater</button>
				<button onClick={() => addTile(6, (<Key />))}>Key</button>
			</div> */}
      <SixBySixCage>
        {/* {
          history.last()?.toArray().map(([k, v]) => {
            return (<Tile>{v}</Tile>)
          })
        } */}
        {/* {
          squares.map((sq: React.ReactNode) => (<Tile key={Math.random()}>{sq}</Tile>))
        } */}
        {/* ROW 1 */}
        <Tile>
          <Gate />
        </Tile>
        <Tile>
          <KeyTile />
        </Tile>
        <Tile>
          <WaxEater />
        </Tile>
        <Tile>
          <StartTile />
        </Tile>
        <Tile>
          <PassageFourWay />
        </Tile>
        <Tile>
          <PassageStraight />
        </Tile>
        {/* ROW 2 */}
        <Tile>
          <PassageT />
        </Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        {/* ROW 3 */}
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        {/* ROW 4 */}
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        {/* ROW 5 */}
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        {/* ROW 6 */}
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
        <Tile></Tile>
      </SixBySixCage>
    </Page>
  )
}


const Page = styled.div`
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	/* overflow-x: auto; */
	overflow: hidden;
`;

const SixBySixCage = styled.div`
	width: 96vw;
	max-width: 900px;
	max-height: 900px;
	justify-content: center;
	display: grid;
  grid-template-columns: repeat(6, minmax(16%, 1fr));
  grid-auto-rows: 1fr;
	&::before {
		content: '';
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
	}
	& > *:first-child {
		grid-row: 1 / 1;
		grid-column: 1 / 1;
	}
	justify-items: center;
	align-items: center;
	gap: 0;
`;

export default ClassicBoard;
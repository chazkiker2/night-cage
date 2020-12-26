import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import Heading from "./layout/Heading";
import Link from "./layout/Link";
import Anchor from "./layout/Anchor";
import MenuBurger from "./layout/MenuBurger";

type NavContainerProps = {
  show: boolean;
};

const Header: React.FC<{}> = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = (event: MouseEvent) => {
    event.preventDefault();
    setNavOpen(!navOpen);
  }
  return (
    <>
      <StyledHeader>
        <div className="container">
          <div>
            <Heading>Night Cage</Heading>
          </div>
          <div>
            {/* <button onClick={toggleNav}>Toggle</button> */}
            <MenuBurger onClick={toggleNav} />
          </div>
        </div>
      </StyledHeader>
      <NavContainer show={navOpen}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/play">Play</Link>
          <Anchor href="https://www.thenightcage.com/">The Real Place</Anchor>
        </nav>
      </NavContainer>
    </>
  )
}

const StyledHeader = styled.header`
  width: 100vw;
  background-color: ${({ theme }) => theme.pDark};
  color: var(--pText);
  padding: 0 2rem;
  div.container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
  div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
`;

const NavContainer = styled.nav<NavContainerProps>`
  display: ${({ show }) => show ? "flex" : "none"};
  width: 100vw;
  background-color: var(--pDarker);
  flex-flow: row nowrap;
  justify-content: center;
  nav {
    display: flex;
    width: 100%;
    flex-flow: row nowrap;
    justify-content: center;
  }
`;

export default Header;
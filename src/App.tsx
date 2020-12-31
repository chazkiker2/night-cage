import React from 'react';
// import logo from './logo.svg';
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./shared/Header";
import PlayHome from "./features/board/PlayHome";
import { darkTheme, rootVars } from "./theme/themes";

// import { Counter } from './features/counter/Counter';
// import './App.css';


const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <StyledApp className="App">
          {/* <Header /> */}
          <Switch>
            <Route path="/play">
              <PlayHome />
            </Route>
            <Route exact path="/">
              <Header />
            </Route>
          </Switch>
        </StyledApp>
      </Router>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  ${rootVars};
  background-color: var(--pBase);
  /* background-color: ${({ theme }) => theme.pBase}; */
  color: ${({ theme }) => theme.pText};
  max-width: 100vw;
  min-height: 100vh;
`;

export default App;

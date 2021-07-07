import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './shared/ProtectedRoute';
import CoinFlip from './components/CoinFlip';
import RockPaperScissors from './components/RockPaperScissors';
import './App.css';


function App() {
const [level, setLevel] = useState(0);


  return (
    <Router>
      <header>GameRoom</header>
      <nav>
        <NavLink
          activeClassName="active"
          className=""
          to="/coinflip"
        >
          Coin Flip
        </NavLink>
        <NavLink
          activeClassName="active"
          className=""
          to="/rockpaperscissors"
        >
          Rock Paper Scissors
        </NavLink>
      </nav>

      <main>
        <Switch>
          <ProtectedRoute
            path="/coinflip"
            reqLevel={0}
            level={level}
          >
            <CoinFlip />
          </ProtectedRoute>
          <ProtectedRoute
            path="/rockpaperscissors"
            reqLevel={1}
            level={level}>
            <RockPaperScissors />
          </ProtectedRoute>
        </Switch>
      </main>
    </Router>

  );
}

export default App;

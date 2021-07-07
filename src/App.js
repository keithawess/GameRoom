import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './shared/ProtectedRoute';
import CoinFlip from './components/CoinFlip/CoinFlip';
import RockPaperScissors from './components/RockPaperScissors';
import './App.css';


function App() {
const [level, setLevel] = useState(0);
const [experience, setExperience] = useState(0);

useEffect(()=>{
  if(experience >= 100)
  {
    setLevel(level + 1);
    setExperience(experience - 100);
  }
},[experience]);

const experienceUp = useCallback((exp) => {
  setExperience((curr)=> curr + exp);
},[])


  return (
    <Router>
      <header>GameRoom Level: {level} Exp: {experience}</header>
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
            <CoinFlip experienceUp={experienceUp} level={level}/>
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

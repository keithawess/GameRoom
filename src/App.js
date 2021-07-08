import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, NavLink, Switch } from "react-router-dom";
import ProtectedRoute from "./shared/ProtectedRoute";
import CoinFlip from "./components/CoinFlip/CoinFlip";
import RockPaperScissors from "./components/RockPaperScissors/RockPaperScissors";
import RequestBuddy from "./components/Buddy/Buddy";
import "./App.css";

function App() {
  const [level, setLevel] = useState(10);
  const [experience, setExperience] = useState(0);
  const [buddy, setBuddy] = useState(null);

  useEffect(() => {
    if (experience >= 100) {
      setLevel(level + 1);
      setExperience(experience - 100);
    }
  }, [experience, level]);

  const experienceUp = useCallback((exp) => {
    setExperience((curr) => curr + exp);
  }, []);

  return (
    <Router>
      <header>
        GameRoom Level: {level} Exp: {experience}
      </header>
      <nav>
        <NavLink activeClassName="active" className="" to="/coinflip">
          Coin Flip
        </NavLink>
        <NavLink activeClassName="active" className="" to="/rockpaperscissors">
          Rock Paper Scissors
        </NavLink>
        <NavLink activeClassName="active" className="" to="/buddy">
          Buddy
        </NavLink>
      </nav>

      <main>
        <Switch>
          <ProtectedRoute path="/coinflip" reqLevel={0} level={level}>
            <CoinFlip experienceUp={experienceUp} level={level} />
          </ProtectedRoute>
          <ProtectedRoute path="/rockpaperscissors" reqLevel={1} level={level}>
            <RockPaperScissors experienceUp={experienceUp} level={level} />
          </ProtectedRoute>
          <ProtectedRoute path="/buddy" reqLevel={2} level={level}>
            <RequestBuddy buddy={buddy} setBuddy={setBuddy} />
          </ProtectedRoute>
        </Switch>
      </main>
    </Router>
  );
}

export default App;

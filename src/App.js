import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, NavLink, Switch } from "react-router-dom";
import ProtectedRoute from "./shared/ProtectedRoute";
import CoinFlip from "./components/CoinFlip/CoinFlip";
import RockPaperScissors from "./components/RockPaperScissors/RockPaperScissors";
import TicTacToe from "./components/TicTacToe/TicTacToe";
import Buddy from "./components/Buddy/Buddy";
import BuddyDisplay from "./components/Buddy/components/BuddyDisplay";
import Home from "./components/Home";
import heart from "./heart.png";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [level, setLevel] = useState(0);
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
      <nav className="flex width-100 space-evenly bg-white text-black text-center border-rad-10">
        <NavLink
          activeClassName="active bg-blue-9 text-white"
          className="border-blue grow nav-start nav-option"
          exact
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          activeClassName="active bg-blue-9 text-white"
          className="border-blue grow nav-option"
          to="/coinflip"
        >
          Coin Flip
        </NavLink>
        {level > 0 && (
          <NavLink
            activeClassName="active bg-blue-9 text-white"
            className="border-blue grow nav-option"
            to="/rockpaperscissors"
          >
            Rock Paper Scissors
          </NavLink>
        )}
        {level > 1 && (
          <NavLink
            activeClassName="active bg-blue-9 text-white"
            className="border-blue grow nav-option"
            to="/tictactoe"
          >
            Tic Tac Toe
          </NavLink>
        )}
        <NavLink
          activeClassName="active bg-blue-9 text-white"
          className="border-blue grow nav-end nav-option"
          to="/buddy"
        >
          Buddy
        </NavLink>
      </nav>

      <div className="flex justify-center">
        {username && (
          <aside className="aside third flex align-items-center justify-center col">
            <h3>Stats:</h3>
            <div>You're Awesome</div>
          </aside>
        )}

        {!username && <div className="aside third">&nbsp;</div>}

        <div className="third middle-container">
          <header>
            <div className="text-center">Level: {level} </div>
            <div className="flex align-items-center justify-center">
              {" "}
              <div className="margin-10 line-height-0">Exp:</div>
              <div className="exp-bar text-center border">
                <div className="font-10 exp-text z1 absolute line-height-10">
                  {experience} / 100
                </div>
                <div
                  className="exp-filler"
                  style={{ width: `calc(${experience}% - 4px)` }}
                >
                  &nbsp;
                </div>
              </div>
            </div>
          </header>
          <main>
            <Switch>
              <ProtectedRoute exact path="/" reqLevel={0} level={level}>
                <Home
                  level={level}
                  setLevel={setLevel}
                  username={username}
                  setUsername={setUsername}
                />
              </ProtectedRoute>
              <ProtectedRoute path="/coinflip" reqLevel={0} level={level}>
                <CoinFlip experienceUp={experienceUp} level={level} />
              </ProtectedRoute>
              <ProtectedRoute
                path="/rockpaperscissors"
                reqLevel={1}
                level={level}
              >
                <RockPaperScissors experienceUp={experienceUp} level={level} />
              </ProtectedRoute>
              <ProtectedRoute path="/tictactoe" reqLevel={2} level={level}>
                <TicTacToe experienceUp={experienceUp} level={level} />
              </ProtectedRoute>
              <ProtectedRoute path="/buddy" reqLevel={0} level={level}>
                <Buddy username={username} buddy={buddy} setBuddy={setBuddy} />
              </ProtectedRoute>
            </Switch>
          </main>
        </div>

        {buddy && (
          <aside className="aside third flex align-items-center justify-center col">
            <img
              className="z1 absolute heart"
              key={experience}
              src={heart}
              alt="Heart"
            />
            <h3>Buddy:</h3>
            <BuddyDisplay experience={experience} buddy={buddy} />
          </aside>
        )}
        {!buddy && <div className="aside third">&nbsp;</div>}
      </div>
    </Router>
  );
}

export default App;

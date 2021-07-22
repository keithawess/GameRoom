import React, { useState, useContext } from "react";
import { BrowserRouter as Router, NavLink, Switch } from "react-router-dom";
import ProtectedRoute from "./shared/ProtectedRoute";
import CoinFlip from "./components/CoinFlip/CoinFlip";
import RockPaperScissors from "./components/RockPaperScissors/RockPaperScissors";
import TicTacToe from "./components/TicTacToe/TicTacToe";
import Buddy from "./components/Buddy/Buddy";
import BuddyDisplay from "./components/Buddy/components/BuddyDisplay";
import { UserContext, BuddyContext } from "./context";
import Home from "./components/Home";
import Signup from "./components/Signup/Signup";
import heart from "./heart.png";
import "./App.css";

function App() {
  // States
  const [navScroll, setNavScroll] = useState(0);
  const { level, experience, logout, userId } = useContext(UserContext);
  const { buddy, setBuddy } = useContext(BuddyContext);

  return (
    <Router>
      {/* Nav Bar | Shows links as level requirements are met. */}
      <nav className="flex width-100 space-evenly bg-white text-black text-center border-rad-10">
        <NavLink
          activeClassName="active bg-blue-9 text-white"
          className="border-blue grow nav-start nav-option"
          exact
          to="/"
        >
          Home
        </NavLink>
        {level > 0 && (
          <div
            className="border-blue nav-option mobile-specific"
            onClick={() => {
              if (navScroll > 0) {
                setNavScroll((navScroll) => navScroll - 1);
              }
            }}
          >
            &lt;
          </div>
        )}
        <NavLink
          activeClassName="active bg-blue-9 text-white"
          className={`border-blue grow nav-option ${
            navScroll === 0 ? "" : "mobile-hidden"
          }`}
          to="/coinflip"
        >
          Coin Flip
        </NavLink>
        {level > 0 && (
          <NavLink
            activeClassName="active bg-blue-9 text-white"
            className={`border-blue grow nav-option ${
              navScroll === 1 ? "" : "mobile-hidden"
            }`}
            to="/rockpaperscissors"
          >
            RPS
          </NavLink>
        )}
        {level > 1 && (
          <NavLink
            activeClassName="active bg-blue-9 text-white"
            className={`border-blue grow nav-option ${
              navScroll === 2 ? "" : "mobile-hidden"
            }`}
            to="/tictactoe"
          >
            Tic Tac Toe
          </NavLink>
        )}
        {level > 0 && (
          <div
            className="border-blue nav-option mobile-specific"
            onClick={() => {
              if (navScroll < level && navScroll < 2) {
                setNavScroll((navScroll) => navScroll + 1);
              }
            }}
          >
            &gt;
          </div>
        )}
        <NavLink
          activeClassName="active bg-blue-9 text-white"
          className={`border-blue grow ${userId ? "" : "nav-end"} nav-option `}
          to="/buddy"
        >
          Buddy
        </NavLink>
        {userId && (
          <NavLink
            className="border-blue grow nav-option nav-end"
            to="/"
            onClick={async () => {
              logout();
              setBuddy(null);
              setNavScroll(0);
            }}
          >
            Logout
          </NavLink>
        )}
      </nav>

      {/* Body of Page */}
      <div className="flex justify-center">
        {/* Stats Aside | Shows only if player decides to enter username. 
        Plan to include stats based off of games played, wins, and losses. */}
        {userId && (
          <aside className="aside third flex align-items-center justify-center col">
            <h3>Stats:</h3>
            <div>You're Awesome</div>
          </aside>
        )}

        {/* Keeps spacing when buddy aside exists, but stats does not. */}
        {!userId && <div className="aside third">&nbsp;</div>}

        {/* Middle Section of Body. */}
        <div className="third middle-container">
          {/* Displays level and experience */}
          <header>
            <div className="text-center">Level: {level} </div>
            <div className="flex align-items-center justify-center">
              <div className="margin-10 line-height-0">Exp:</div>
              <div className="exp-bar text-center border">
                <div className="font-10 exp-text z1 absolute line-height-10">
                  {experience} / 100
                </div>
                {/* Fills experience bar with a div. */}
                <div
                  className="exp-filler"
                  style={{ width: `calc(${experience}% - 4px)` }}
                >
                  &nbsp;
                </div>
              </div>
            </div>
          </header>

          {/* Components switched out based off Route Path
          If level requirement is not met, redirects to home */}
          <main>
            <Switch>
              <ProtectedRoute exact path="/" reqLevel={0} level={level}>
                <Home setBuddy={setBuddy} />
              </ProtectedRoute>
              <ProtectedRoute path="/coinflip" reqLevel={0} level={level}>
                <CoinFlip />
              </ProtectedRoute>
              <ProtectedRoute
                path="/rockpaperscissors"
                reqLevel={1}
                level={level}
              >
                <RockPaperScissors level={level} />
              </ProtectedRoute>
              <ProtectedRoute path="/tictactoe" reqLevel={2} level={level}>
                <TicTacToe />
              </ProtectedRoute>
              <ProtectedRoute path="/buddy" reqLevel={0} level={level}>
                <Buddy />
              </ProtectedRoute>
              <ProtectedRoute path="/signup" reqLevel={0} level={level}>
                <Signup />
              </ProtectedRoute>
            </Switch>
          </main>
        </div>

        {/* Displays buddy if buddy exists */}
        {buddy && (
          <aside className="aside third flex align-items-center justify-center col">
            {/* Heart animation plays every time the user gets experience */}
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

        {/* Keeps spacing when stats aside exists without a buddy */}
        {!buddy && <div className="aside third">&nbsp;</div>}
      </div>
    </Router>
  );
}

export default App;

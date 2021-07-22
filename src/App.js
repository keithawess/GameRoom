import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, NavLink, Switch } from "react-router-dom";
import useFetchDB from "./hooks/useFetchDB";
import ProtectedRoute from "./shared/ProtectedRoute";
import CoinFlip from "./components/CoinFlip/CoinFlip";
import RockPaperScissors from "./components/RockPaperScissors/RockPaperScissors";
import TicTacToe from "./components/TicTacToe/TicTacToe";
import Buddy from "./components/Buddy/Buddy";
import BuddyDisplay from "./components/Buddy/components/BuddyDisplay";
import Home from "./components/Home";
import Signup from "./components/Signup/Signup";
import heart from "./heart.png";
import "./App.css";

function App() {
  // States
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [level, setLevel] = useState(0);
  const [experience, setExperience] = useState(0);
  const [buddy, setBuddy] = useState(null);
  const { callAPI: levelCall } = useFetchDB("PATCH");
  const { callAPI: expCall } = useFetchDB("PATCH");
  const { callAPI: logoutCall } = useFetchDB("GET");
  const { callAPI: validateCall } = useFetchDB("GET");
  const { callAPI: buddyCall } = useFetchDB("GET");
  const [navScroll, setNavScroll] = useState(0);


  useEffect(() => {
    async function validate() {
      const res = await validateCall("/api/users/validate");
      if (res.success) {
        setUsername(res.data.username);
        setLevel(res.data.level);
        setExperience(res.data.experience);
        setUserId(res.data.id);

        let buddyRes = await buddyCall(
          `/api/buddies/user/${res.data.id}`
        );
        setUsername(res.data.username);
        if (buddyRes.error) {
          return;
        }
        setBuddy(buddyRes.data);
      }
    }
    validate();
  }, []);

  // Adds 1 to level when experience reaches 100 and resets experience.
  useEffect(() => {
    if (experience >= 100) {
      setLevel(level + 1);
      setExperience(experience - 100);
    }
  }, [experience, level]);

  useEffect(async () => {
    if (userId) {
      let res = await levelCall("/api/users/level", {
        userId: userId,
        level: level,
      });
      if (res.error) {
        console.log(res.error);
      }
      //   let resExp = await expCall("/api/users/experience", {
      //     userId: userId,
      //     experience: 0,
      //   });
      //   if (resExp.error) {
      //     console.log(resExp.error);
      // }
    }
  }, [level]);

  // Function adds specified amount of experience. Params: int
  const experienceUp = useCallback((exp) => {
    setExperience((curr) => curr + exp);
  }, []);

  useEffect(async () => {
    if (userId) {
      let res = await expCall("/api/users/experience", {
        userId: userId,
        experience: experience,
      });
      if (res.error) {
        console.log(res.error);
      }
    }
  }, [experience]);

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
        {level > 0 && <div
          className="border-blue nav-option mobile-specific"
          onClick={() => {
            if (navScroll > 0) {
              setNavScroll((navScroll) => navScroll - 1);
            }
          }}
        >
          &lt;
        </div>}
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
        {level > 0 && <div
          className="border-blue nav-option mobile-specific"
          onClick={() => {
            if (navScroll < level && navScroll < 2) {
              setNavScroll((navScroll) => navScroll + 1);
            }
          }}
        >
          &gt;
        </div>}
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
              setUserId("");
              setUsername("");
              setLevel(0);
              setExperience(0);
              setBuddy(null);
              setNavScroll(0);
              await logoutCall("/api/users/logout");
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
        {username && (
          <aside className="aside third flex align-items-center justify-center col">
            <h3>Stats:</h3>
            <div>You're Awesome</div>
          </aside>
        )}

        {/* Keeps spacing when buddy aside exists, but stats does not. */}
        {!username && <div className="aside third">&nbsp;</div>}

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
                <Home
                  level={level}
                  setLevel={setLevel}
                  username={username}
                  setUsername={setUsername}
                  userId={userId}
                  setUserId={setUserId}
                  setExperience={setExperience}
                  setBuddy={setBuddy}
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
                <Buddy
                  username={username}
                  userId={userId}
                  buddy={buddy}
                  setBuddy={setBuddy}
                />
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

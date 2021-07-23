import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context";
import useFetchDB from "../hooks/useFetchDB";
import coin from "./CoinFlip/images/heads.png";
import rock from "./RockPaperScissors/images/rock.png";
import x from "./TicTacToe/x.png";
import comingSoon from "./help-sing.png";

export default function Home() {
  // States
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [error, setError] = useState(null);
  const { userId, level, login } = useContext(UserContext);
  const { callAPI: loginCall } = useFetchDB("POST");
  let history = useHistory();

  return (
    <div>
      <h1 className="text-center">Home</h1>

      {/* If a username hasn't been submitted, Shows input form */}
      {!userId && (
        <div className="username-box margin-center">
          <div className="margin-center">
            <label htmlFor="usernameInput">Username: </label>
            <div className="inline-block">
              <input
                id="usernameInput"
                placeholder="'Keith' for shortcut"
                value={usernameInput}
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                }}
                onBlur={() => {
                  if (usernameInput.length < 3) {
                    setUsernameValid(false);
                  } else {
                    setUsernameValid(true);
                  }
                }}
              />
            </div>
          </div>

          <div className="margin-center">
            <label htmlFor="passwordInput">Password: </label>
            <div className="inline-block">
              <input
                id="passwordInput"
                placeholder="'password' for shortcut"
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                }}
                onBlur={() => {
                  if (passwordInput.length < 6) {
                    setPasswordValid(false);
                  } else {
                    setPasswordValid(true);
                  }
                }}
              />
            </div>
          </div>

          {/* Username Must be at least 3 characters. "Keith" will set level to 1000 */}
          <button
            type="button"
            className="margin-center margin-top-5 block"
            onClick={async () => {
              if (usernameValid && passwordValid) {
                let res = await loginCall("/api/users/login", {
                  username: usernameInput,
                  password: passwordInput,
                });
                if (res.error) {
                  return setError(res.error);
                }
                login(res.data);
              } else {
                setError("Username / Password are invalid");
              }
            }}
          >
            Submit
          </button>
          {error && <div>{error}</div>}

          <div className="font-small text-center margin-10">
            Don't have an account?{" "}
            <div>
              <button
                onClick={() => {
                  history.push("/signup");
                }}
                className="font-small"
              >
                Sign Up!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If username has been provided, Displays home page
        Shows clickable icons for each game*/}
      {userId && (
        <div className="flex wrap space-evenly">
          <div className="home-option unlocked">
            <img
              onClick={() => {
                history.push("/coinflip");
              }}
              className="home-option"
              src={coin}
              alt="Coin Flip"
            />
          </div>
          <div
            onClick={() => {
              if (level > 0) {
                history.push("/rockpaperscissors");
              }
            }}
            className={`home-option border flex align-items-center circle justify-center ${
              level < 1 ? "locked" : "unlocked"
            }`}
          >
            <img className="rock-thumb" src={rock} alt="Rock Paper Scissors" />
          </div>

          <div
            onClick={() => {
              if (level > 1) {
                history.push("/tictactoe");
              }
            }}
            className={`home-option border flex align-items-center circle justify-center ${
              level < 2 ? "locked" : "unlocked"
            }`}
          >
            <img className="x-thumb" src={x} alt="Tic Tac Toe" />
          </div>
          <div className="home-option border flex align-items-center circle justify-center locked">
            <img
              className="rock-thumb"
              src={comingSoon}
              alt="Coin Flip"
              title="Coming Soon"
            />
          </div>
        </div>
      )}
    </div>
  );
}

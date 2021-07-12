import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import coin from "./CoinFlip/images/heads.png";
import rock from "./RockPaperScissors/images/rock.png";
import x from "./TicTacToe/x.png";
import comingSoon from "./help-sing.png";

export default function Home({ username, setUsername, level, setLevel }) {
  // States
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  let history = useHistory();

  return (
    <div>
      <h1 className="text-center">Home</h1>

      {/* If a username hasn't been submitted, Shows input form */}
      {!username && (
        <div className="username-box margin-center">
          <div className="margin-center">
            <label htmlFor="usernameInput">Username: </label>
            <div className="inline-block">
              <input
                id="usernameInput"
                placeholder="Enter Username"
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
          <div className={"font-small " + (usernameValid ? "" : "text-red")}>
            Must be at least 3 characters
          </div>

          {/* Username Must be at least 3 characters. "Keith" will set level to 1000 */}
          <button
            type="button"
            className="margin-center margin-top-5 block"
            onClick={() => {
              if (usernameInput.length >= 3) {
                setUsername(usernameInput);
              }
              if (usernameInput.toLowerCase() === "keith") {
                setLevel(1000);
              }
            }}
          >
            Submit
          </button>
        </div>
      )}

      {/* If username has been provided, Displays home page
        Shows clickable icons for each game*/}
      {username && (
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

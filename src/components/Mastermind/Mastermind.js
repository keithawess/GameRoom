import React, { useCallback, useContext, useEffect, useState } from "react";
import MastermindCodeDisplay from "./components/MastermindCodeDisplay";
import { UserContext } from "../../context";

export default function Mastermind() {
  //State
  const [guesses, setGuesses] = useState(0);
  const [playerGuess, setPlayerGuess] = useState([0, 0, 0, 0]);
  const [pastGuesses, setPastGuesses] = useState(
    Array(6).fill(Array(4).fill(0))
  );
  const [code, setCode] = useState([]);
  const [feedback, setFeedback] = useState(Array(6).fill(Array(2).fill(0)));
  const [gameRunning, setGameRunning] = useState(false);
  const [result, setResult] = useState("New Game?");
  const {level, experienceUp} = useContext(UserContext);

  //Colors Options
  const colors = ["red", "yellow", "blue", "green", "purple", "orange"];

  const generateCode = useCallback(() => {
    let temp = [];
    for (let i = 0; i < 4; i++) {
      temp[i] = Math.floor(Math.random() * 6);
    }
    console.log(temp);
    return temp;
  }, []);

  const startGame = useCallback(() => {
    setResult(null);
    setGuesses(0);
    setPastGuesses(Array(6).fill(Array(4).fill(0)));
    setFeedback(Array(6).fill(Array(2).fill(0)));
    setGameRunning(true);
    setCode(generateCode());
  }, []);

  const endGame = useCallback((endResult) => {
    setGameRunning(false);
    if(endResult === "Win!" && level === 3)
    {experienceUp(25);}
    setResult(endResult);
  }, []);

  const checkCode = useCallback(() => {
    let reds = 0;
    let whites = 0;
    let taken = [];

    for (let i = 0; i < 4; i++) {
      if (playerGuess[i] === code[i]) {
        reds++;
        taken.push(i);
      } else {
        for (let j = 0; j < 4; j++) {
          if (playerGuess[i] === code[j] && !taken.includes(j) && (playerGuess[j] !== code[j])) {
            whites++;
            taken.push(j);
            break;
          }
        }
      }
    }
    console.log(reds, whites);
    if (reds === 4) {
      feedback[guesses] = [reds, whites];
      setFeedback((feedback) => feedback);
      endGame("Win!");
    } else if (guesses >= 6) {
      endGame("Loss...");
    } else {
      feedback[guesses] = [reds, whites];
      setFeedback((feedback) => feedback);
    }
  });

  useEffect(() => {
    console.log(feedback);
  }, [feedback]);

  useEffect(() => {
    console.log(pastGuesses);
  }, [pastGuesses]);

  return (
    <div>
      <h1
        className="text-center"
        onClick={() => {
          if (gameRunning === false) {
            startGame();
          }
          if (gameRunning === true) {
            endGame();
          }
        }}
      >
        Mastermind
      </h1>

      {/* Game Board */}
      <div className="game-board margin-center flex wrap flex-start">
        <div
          className={`margin-center flex game-options justify-center ${
            guesses >= 0 ? "" : "hidden"
          }`}
        >
          <div
            className={`mm-input circle border margin-10 ${
              result ? `bg-${colors[code[0]]}` : "bg-black"
            }`}
          ></div>
          <div
            className={`mm-input circle border margin-10 ${
              result ? `bg-${colors[code[1]]}` : "bg-black"
            }`}
          ></div>
          <div
            className={`mm-input circle border margin-10 ${
              result ? `bg-${colors[code[2]]}` : "bg-black"
            }`}
          ></div>
          <div
            className={`mm-input circle border margin-10 ${
              result ? `bg-${colors[code[3]]}` : "bg-black"
            }`}
          ></div>
        </div>

        {guesses >= 1 && (
          <MastermindCodeDisplay
            color1={colors[pastGuesses[0][0]]}
            color2={colors[pastGuesses[0][1]]}
            color3={colors[pastGuesses[0][2]]}
            color4={colors[pastGuesses[0][3]]}
            feedback={feedback[0]}
          />
        )}

        {guesses >= 2 && (
          <MastermindCodeDisplay
            color1={colors[pastGuesses[1][0]]}
            color2={colors[pastGuesses[1][1]]}
            color3={colors[pastGuesses[1][2]]}
            color4={colors[pastGuesses[1][3]]}
            feedback={feedback[1]}
          />
        )}

        {guesses >= 3 && (
          <MastermindCodeDisplay
            color1={colors[pastGuesses[2][0]]}
            color2={colors[pastGuesses[2][1]]}
            color3={colors[pastGuesses[2][2]]}
            color4={colors[pastGuesses[2][3]]}
            feedback={feedback[2]}
          />
        )}

        {guesses >= 4 && (
          <MastermindCodeDisplay
            color1={colors[pastGuesses[3][0]]}
            color2={colors[pastGuesses[3][1]]}
            color3={colors[pastGuesses[3][2]]}
            color4={colors[pastGuesses[3][3]]}
            feedback={feedback[3]}
          />
        )}

        {guesses >= 5 && (
          <MastermindCodeDisplay
            color1={colors[pastGuesses[4][0]]}
            color2={colors[pastGuesses[4][1]]}
            color3={colors[pastGuesses[4][2]]}
            color4={colors[pastGuesses[4][3]]}
            feedback={feedback[4]}
          />
        )}

        {guesses >= 6 && (
          <MastermindCodeDisplay
            color1={colors[pastGuesses[5][0]]}
            color2={colors[pastGuesses[5][1]]}
            color3={colors[pastGuesses[5][2]]}
            color4={colors[pastGuesses[5][3]]}
            feedback={feedback[5]}
          />
        )}

      </div>

      {/* Player input */}
      <div className="margin-center flex game-options justify-center">
        <div
          className={`mm-input circle border margin-10 bg-${
            colors[playerGuess[0]]
          }`}
          onClick={() => {
            if (gameRunning) {
              setPlayerGuess([
                (playerGuess[0] + 1) % 6,
                playerGuess[1],
                playerGuess[2],
                playerGuess[3],
              ]);
            }
          }}
        ></div>
        <div
          className={`mm-input circle border margin-10 bg-${
            colors[playerGuess[1]]
          }`}
          onClick={() => {
            if (gameRunning) {
              setPlayerGuess([
                playerGuess[0],
                (playerGuess[1] + 1) % 6,
                playerGuess[2],
                playerGuess[3],
              ]);
            }
          }}
        ></div>
        <div
          className={`mm-input circle border margin-10 bg-${
            colors[playerGuess[2]]
          }`}
          onClick={() => {
            if (gameRunning) {
              setPlayerGuess([
                playerGuess[0],
                playerGuess[1],
                (playerGuess[2] + 1) % 6,
                playerGuess[3],
              ]);
            }
          }}
        ></div>
        <div
          className={`mm-input circle border margin-10 bg-${
            colors[playerGuess[3]]
          }`}
          onClick={() => {
            if (gameRunning) {
              setPlayerGuess([
                playerGuess[0],
                playerGuess[1],
                playerGuess[2],
                (playerGuess[3] + 1) % 6,
              ]);
            }
          }}
        ></div>
      </div>
      <div className="margin-center">
        <button
          type="button"
          className="margin-center block"
          onClick={async () => {
            if (gameRunning) {
              pastGuesses[guesses] = playerGuess;
              checkCode();
              await setGuesses(guesses + 1);
            }
          }}
        >
          Submit
        </button>
      </div>

      {result && (
        <div className="flex justify-center align-items-center absolute absolute-center z1">
          <div className="mm-modal z1 text-center border-blue border-rad-10 bg-white">
            {result}
            <div className="margin-center">
              <button
                onClick={() => {
                  startGame();
                }}
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
